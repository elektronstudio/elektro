import { describe, test, assert, vi } from "vitest";
import { ref } from "vue";
import { bla, getTicketStatus, storeLocalTicket } from "./fienta";

// Mock the ticket local store

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

test("ticketable requires ticket and user stores and checks that it has ticket", () => {
  storeLocalTicket("casd", "fasa");
  return assert.equal(getTicketStatus([{ fienta_id: "fasa" }]), "HAS_TICKET");
});
