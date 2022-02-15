import { useStorage } from "@vueuse/core";
import { uniqueCollection } from "./array";

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
  console.log(tickets.value);
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
