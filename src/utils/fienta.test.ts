import { ref } from "vue";
import {
  describe,
  test,
  assert,
  vi,
  beforeAll,
  afterAll,
  afterEach,
} from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { getTicketStatus, storeLocalTicket, getRemoteTicket } from "./fienta";
import { config } from "./config";

// Mock the Fienta API

export const handlers = [
  rest.get(
    `https://fienta.com/api/v1/tickets/coad` as string,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ ticket: { status: "SASD", event_id: "fass" } }),
      );
    },
  ),
];

const server = setupServer(...handlers);
beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// Mock the ticket localstore

vi.mock("@vueuse/core", () => {
  return {
    useStorage: () => ref([{ fientaid: "fass", code: "coad" }]),
  };
});

// Test getTicketStatus

test("ticketable does not require ticket", () => {
  return assert.equal(getTicketStatus([{}]), "FREE");
});

test("ticketable requires ticket and user does not have ticket", () => {
  return assert.equal(
    getTicketStatus([{ fienta_id: "foai" }]),
    "REQUIRES_TICKET",
  );
});

test("ticketable requires ticket and user has ticket", () => {
  return assert.equal(getTicketStatus([{ fienta_id: "fass" }]), "HAS_TICKET");
});

test("one of many ticketables requires ticket and user has ticket", () => {
  return assert.equal(
    getTicketStatus([{ fienta_id: "fass" }, { fienta_id: "fyas" }]),
    "HAS_TICKET",
  );
});

// Test storeLocalTicket

test("ticketable requires ticket and user stores and checks that it has ticket", () => {
  storeLocalTicket("casd", "fasa");
  return assert.equal(getTicketStatus([{ fienta_id: "fasa" }]), "HAS_TICKET");
});

//

test("fetch", async () => {
  const a = await getRemoteTicket("coad");
  return assert.deepEqual(a, { fienta_id: "fass", fienta_status: "SASD" });
});
