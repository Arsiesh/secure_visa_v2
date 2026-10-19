import { useState } from "react";
import clsx from "clsx";
import { homeSituation, homeSpecialists } from "../../content/home";
import { Container } from "../Container";
import { Img } from "../Img";
import { ReadMore } from "./ReadMore";

export function SituationSection() {
  const [open, setOpen] = useState(false);
  return (
    <section
      aria-labelledby="situation-title"
      className="bg-mist py-16 sm:py-20 lg:py-28"
    >
      <Container className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2
            id="situation-title"
            className="font-display max-w-[24ch] text-[clamp(1.875rem,3.8vw,3.25rem)]"
          >
            {homeSituation.heading}
          </h2>
          <ul className="mt-9 border-t border-line">
            {homeSituation.lines.map((line) => (
              <li
                key={line.q}
                className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
              >
                <p className="text-[1.25rem] text-ink-muted sm:max-w-[26ch]">
                  {line.q}
                </p>
                <p className="font-display text-[1.75rem] text-fern sm:text-right sm:text-[2rem]">
                  {line.a}
                </p>
              </li>
            ))}
          </ul>
          <ReadMore
            expanded={open}
            onToggle={() => setOpen((v) => !v)}
            label="Read more"
          >
            <p className="mt-8 max-w-[56ch] text-[1.25rem] leading-snug">
              {homeSituation.body}
            </p>

            <figure className="mt-12 max-w-[60ch] border-l-4 border-fern pl-6">
              <blockquote className="flex flex-col gap-4">
                <p className="text-[1.25rem] font-semibold leading-snug">
                  {homeSpecialists.body[0]}
                </p>
                <p>{homeSpecialists.body[1]}</p>
              </blockquote>
            </figure>
          </ReadMore>
        </div>
        <div
          className={clsx(
            "items-end justify-center md:flex lg:col-span-5 lg:justify-end",
            open ? "flex" : "hidden",
          )}
        >
          <Img
            name={homeSpecialists.image}
            alt="Aina and Jan Sacdalan with their daughter, with the Sky Tower of Auckland behind them"
            sizes="(min-width: 1024px) 420px, 80vw"
            className="h-auto w-full max-w-[22rem] lg:max-w-[26rem]"
          />
        </div>
      </Container>
    </section>
  );
}
