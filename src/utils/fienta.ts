import { useStorage } from "@vueuse/core";
import { renameSync } from "fs";
import { uniqueCollection } from "./array";
import ky from "ky-universal";
import { config } from "./config";

type TicketStatus = "FREE" | "REQUIRES_TICKET" | "HAS_TICKET";

// We do not have proper types for events yet
// so we accept any object with "fienta_id" key
type Ticketable = {
  fienta_id?: string;
  [key: string]: any;
};

type Ticket = {
  code: string;
  fientaid: string;
};

// Ticket local storage
// Security by obscurity

const tickets = useStorage<Ticket[]>("elektron_data", []);

// Fienta API client instance

const fienta = ky.create({
  prefixUrl: config.fientaUrl as string,
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("Authorization", `Bearer ${config.fientaToken}`);
      },
    ],
  },
});

// Local tickets API

function getLocalTicket(code: string): Ticket | undefined {
  return tickets.value?.find((ticket) => ticket.code == code);
}

export function setLocalTicket(code: string, fienta_id: string): any {
  tickets.value = uniqueCollection(
    [
      ...tickets.value,
      {
        code: code,
        fientaid: fienta_id,
      },
    ],
    "code",
  );
  return tickets.value;
}

// Remote tickets API

export function getRemoteTicket(
  code: string,
): Promise<{ fienta_status: string; fienta_id: string }> {
  return fienta
    .get(`tickets/${code}`)
    .json()
    .then((res: any) => {
      return {
        fienta_status: res?.ticket?.status,
        fienta_id: res?.ticket?.event_id,
      };
    });
}

export async function getTicketableRoute(
  fienta_id: string,
): Promise<string | null> {
  return new Promise((resolve, reject) =>
    fienta_id === "coad" ? resolve("/event/bla") : reject(null),
  );
}

// Ticket validation

export async function validateTicket(code: string): Promise<string | null> {
  let route = null;
  const localTicket = getLocalTicket(code);
  if (localTicket) {
    const ticketableRoute = await getTicketableRoute(localTicket.fientaid);
    if (ticketableRoute) {
      route = ticketableRoute;
    }
  } else {
    const remoteTicket = await getRemoteTicket(code);
    if (remoteTicket) {
      const ticketableRoute = await getTicketableRoute(remoteTicket.fienta_id);
      if (ticketableRoute) {
        setLocalTicket(code, remoteTicket.fienta_id);
        route = ticketableRoute;
      }
    }
  }
  return route;
}

// Ticketable status

export function getTicketableStatus(ticketables: Ticketable[]) {
  let status: TicketStatus = "FREE";

  const ticketablesRequiringTickets = ticketables.filter(
    (ticketable) => ticketable.fienta_id,
  );

  if (ticketablesRequiringTickets.length) {
    status = "REQUIRES_TICKET";
  }

  const ticketsForTicketables = ticketablesRequiringTickets.flatMap(
    (ticketable) =>
      tickets.value.filter((t) => t.fientaid == ticketable.fienta_id),
  );

  if (ticketsForTicketables.length) {
    status = "HAS_TICKET";
  }

  //TODO: Should we return the tickets as well?
  return status;
}
