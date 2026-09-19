import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface py-[34px]">
      <Container>
        <p className="text-[.875rem] text-ink-3">
          Hideout Studios · direct booking preview. Prices, policies and the blocked dates in the
          demo are examples, not final.
        </p>
      </Container>
    </footer>
  );
}
