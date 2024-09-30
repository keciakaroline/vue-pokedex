import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/vue";
import { mockServer } from "./mockServer";

beforeAll(() => {
  mockServer.listen({
    onUnhandledRequest: "error",
  });
});

afterEach(() => {
  mockServer.resetHandlers();
});

afterEach(() => {
  cleanup();
});

afterAll(() => {
  mockServer.close();
});
