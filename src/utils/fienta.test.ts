import { ref } from "vue";
import { test, assert, vi, beforeAll, afterAll, afterEach } from "vitest";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { getTicketableStatus, validateTicket } from "./fienta";
import { config } from "./config";

// Deps mocks

vi.mock("@vueuse/core", () => {
  return {
    // TODO: Check for "elektron_data" argument
    useStorage: () => ref([{ fientaid: "F1", code: "C1" }]),
  };
});

// TODO: Vitest does not expose import.meta.env
// Find a way to inject env variables

vi.mock("./config", () => {
  return {
    config: {
      fientaUrl: "http://fienta.test/api/v1",
      strapiUrl: "http://strapi.elektron.art",
    },
  };
});

// API mocks

export const handlers = [
  // Fienta API
  // We only mock a small subset of data that Fienta API returns
  // https://speca.io/Fienta/fienta-api#get-ticket
  rest.get(`${config.fientaUrl}/tickets/C1` as string, (_req, res, ctx) => {
    const data = { ticket: { event_id: "F1", status: "UNUSED" } };
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get(`${config.fientaUrl}/tickets/C2` as string, (_req, res, ctx) => {
    const data = { ticket: { event_id: "F2", status: "UNUSED" } };
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get(`${config.fientaUrl}/tickets/C3` as string, (_req, res, ctx) => {
    const data = { ticket: { event_id: "F3", status: "UNUSED" } };
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get(`${config.fientaUrl}/tickets/C4` as string, (_req, res, ctx) => {
    const data = { ticket: { event_id: "F100", status: "UNUSED" } };
    return res(ctx.status(200), ctx.json(data));
  }),
  rest.get(`${config.fientaUrl}/tickets/C` as string, (_req, res, ctx) => {
    return res(ctx.status(404));
  }),

  // Strapi API
  rest.get(`${config.strapiUrl}/events` as string, (req, res, ctx) => {
    const data = [
      { title: "Event 1", fienta_id: "F1" },
      { title: "Event 2", fienta_id: "F2" },
      { title: "Event 3", fienta_id: "F3" },
    ].filter(
      ({ fienta_id }) => req.url.searchParams.get("fienta_id") === fienta_id,
    );
    return res(ctx.status(200), ctx.json(data));
  }),
  // TODO: Also look fienta_id's from festivals
];

const server = setupServer(...handlers);
beforeAll(() => {
  server.listen();
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

// Test getTicketableStatus

test("ticketable does not have fienta_id field, this means a free event", () => {
  return assert.equal(getTicketableStatus([{}]), "FREE");
});

test("ticketable requires ticket and user does not have ticket", () => {
  return assert.equal(
    getTicketableStatus([{ fienta_id: "F2" }]),
    "REQUIRES_TICKET",
  );
});

test("ticketable requires ticket and user has ticket", () => {
  return assert.equal(getTicketableStatus([{ fienta_id: "F1" }]), "HAS_TICKET");
});

test("one of two ticketables requires ticket and user has ticket", () => {
  return assert.equal(
    getTicketableStatus([{ fienta_id: "F1" }, { fienta_id: "F2" }]),
    "HAS_TICKET",
  );
});

// Test validateTicket

test("validate local ticket code that has event associated", async () => {
  return assert.deepEqual(await validateTicket("C1"), {
    fienta_id: "F1",
    title: "Event 1",
  });
});

test("validate existing remote ticket code that has event associated", async () => {
  return assert.deepEqual(await validateTicket("C3"), {
    fienta_id: "F3",
    title: "Event 3",
  });
});

test("validate existing remote ticket code that does not have event associated", async () => {
  return assert.equal(await validateTicket("C4"), null);
});

test("validate nonexisting remote ticket code", async () => {
  return assert.equal(await validateTicket("C"), null);
});
