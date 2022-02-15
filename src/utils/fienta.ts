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

const tickets = useStorage<Ticket[]>("elektron_data", []);

// We accept multiple fienta IDs (parent / child tickets etc)

export function getTicketStatus(ticketables: Ticketable[]) {
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

export function storeLocalTicket(code: string, fientaId: string): any {
  tickets.value = uniqueCollection(
    [
      ...tickets.value,
      {
        code: code,
        fientaid: fientaId,
      },
    ],
    "code",
  );
  return tickets.value;
}

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
