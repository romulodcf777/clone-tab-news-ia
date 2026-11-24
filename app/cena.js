"use client";

import { useEffect, useState } from "react";

const ROTEIROS = {
  jessica: [
    { quem: "jessica", rosto: "pergunta", linhas: ["Amor, pega a trena pra", "medir essa parede aqui?"] },
    { quem: "romulo", rosto: "constrangido", linhas: ["Daqui a pouco. Melhor,", "pode ser no final de semana?"] },
  ],
  romulo: [
    { quem: "romulo", rosto: "mau", linhas: ["Piépia véia muié!!"] },
    { quem: "jessica", rosto: "desdem", linhas: ["Doidinho do centro..."] },
  ],
  quincas: [{ quem: "quincas", rosto: "feliz", linhas: ["Quen..quen..quenquenhêê"] }],
};

const BALOES = {
  jessica: { x: 200, y: 57, contorno: "M40 8 H360 Q380 8 380 28 V70 Q380 90 360 90 H220 L200 122 L186 90 H40 Q20 90 20 70 V28 Q20 8 40 8Z" },
  romulo: { x: 600, y: 57, contorno: "M440 8 H760 Q780 8 780 28 V70 Q780 90 760 90 H620 L600 122 L586 90 H440 Q420 90 420 70 V28 Q420 8 440 8Z" },
  quincas: { x: 400, y: 61, contorno: "M255 18 H545 Q565 18 565 38 V68 Q565 88 545 88 H422 L402 150 L388 88 H255 Q235 88 235 68 V38 Q235 18 255 18Z" },
};

const PARADA = { falas: [], total: 0 };

export default function Cena() {
  const [{ falas, total }, setCena] = useState(PARADA);
  const visiveis = falas.slice(0, total);

  // Avança para a próxima fala ou encerra a cena
  useEffect(() => {
    if (!falas.length) return;
    const acabou = total === falas.length;
    const espera = !acabou ? 2000 : falas.length > 1 ? 4500 : 3000;
    const temporizador = setTimeout(() => setCena(acabou ? PARADA : { falas, total: total + 1 }), espera);
    return () => clearTimeout(temporizador);
  }, [falas, total]);

  const rosto = (quem) => visiveis.find((fala) => fala.quem === quem)?.rosto;

  function personagem(quem) {
    const tocar = () => setCena({ falas: [...ROTEIROS[quem]], total: 1 });
    return {
      role: "button",
      tabIndex: 0,
      "data-rosto": rosto(quem),
      onClick: tocar,
      onKeyDown: (evento) => {
        if (evento.key === "Enter" || evento.key === " ") {
          evento.preventDefault();
          tocar();
        }
      },
    };
  }

  return (
    <>
      <svg className={rosto("quincas") && "espreguicando"} viewBox="0 0 800 600" role="group" aria-label="Desenho de Jessica, uma mulher loira, Rômulo, um homem de cabelo castanho, e Quincas, uma calopsita lutina, entre os dois">
        {/* Cenário */}
        <rect width="800" height="600" fill="#a9d8dc" />
        <circle cx="400" cy="270" r="215" fill="#fbeecb" />
        <path d="M0 450 Q200 390 400 440 T800 430 V600 H0Z" fill="#8fc19a" />

        {/* Jessica */}
        <g className="falante" aria-label="Tocar na Jessica" {...personagem("jessica")}>
          {/* cabelo atrás */}
          <path d="M200 95 C105 90 92 180 98 250 C102 310 78 350 98 395 C140 420 260 420 302 395 C322 350 298 310 302 250 C308 180 295 90 200 95Z" fill="#e9bd4f" />
          {/* corpo */}
          <path d="M90 530 C90 420 125 385 200 380 C275 385 310 420 310 530Z" fill="#d9576b" />
          <path d="M172 330 H228 V380 Q200 415 172 380Z" fill="#eeb892" />
          {/* rosto */}
          <ellipse cx="200" cy="245" rx="76" ry="92" fill="#fbd0ae" />
          {/* franja */}
          <path d="M200 125 C135 125 112 190 120 262 C142 240 172 205 188 160 C210 205 252 235 280 262 C288 190 265 125 200 125Z" fill="#f6d269" />
          {/* mechas sobre os ombros */}
          <path d="M121 240 C108 300 138 350 112 405 C140 415 160 390 152 350 C146 320 128 290 121 240Z" fill="#f6d269" />
          <path d="M279 240 C292 300 262 350 288 405 C260 415 240 390 248 350 C254 320 272 290 279 240Z" fill="#f6d269" />
          {/* face */}
          <path className="neutro" d="M155 231 Q171 222 186 231 M214 231 Q229 222 245 231" fill="none" stroke="#b58a2f" strokeWidth="4" strokeLinecap="round" />
          <g className="olhos neutro">
            <ellipse cx="172" cy="252" rx="11" ry="12" fill="#fff" />
            <ellipse cx="228" cy="252" rx="11" ry="12" fill="#fff" />
            <circle cx="172" cy="253" r="8" fill="#4a7f5c" />
            <circle cx="228" cy="253" r="8" fill="#4a7f5c" />
            <circle cx="172" cy="253" r="4" fill="#222" />
            <circle cx="228" cy="253" r="4" fill="#222" />
          </g>
          <path className="neutro" d="M160 247 Q171 235 184 246 M216 246 Q229 235 240 247" fill="none" stroke="#543c25" strokeWidth="3" strokeLinecap="round" />
          <circle cx="151" cy="282" r="13" fill="#f39c94" opacity=".55" />
          <circle cx="249" cy="282" r="13" fill="#f39c94" opacity=".55" />
          <path d="M200 262 Q194 279 203 281" fill="none" stroke="#d99a74" strokeWidth="3" strokeLinecap="round" />
          <path className="neutro" d="M177 299 Q200 306 223 299 Q200 327 177 299Z" fill="#c93f55" />
          <g className="expressao pergunta">
            <path d="M153 226 Q169 211 186 221 M214 215 Q231 199 248 214" fill="none" stroke="#b58a2f" strokeWidth="4" strokeLinecap="round" />
            <g fill="#fff"><ellipse cx="172" cy="252" rx="13" ry="14" /><ellipse cx="228" cy="252" rx="13" ry="14" /></g>
            <g fill="#4a7f5c"><circle cx="176" cy="249" r="9" /><circle cx="232" cy="249" r="9" /></g>
            <g fill="#222"><circle cx="176" cy="249" r="4.5" /><circle cx="232" cy="249" r="4.5" /></g>
            <g fill="#fff"><circle cx="179" cy="246" r="2.5" /><circle cx="235" cy="246" r="2.5" /></g>
            <path d="M157 247 Q171 230 187 246 M213 246 Q229 230 243 247" fill="none" stroke="#543c25" strokeWidth="3" strokeLinecap="round" />
            <path d="M184 302 Q203 304 221 294 Q218 317 203 318 Q189 317 184 302Z" fill="#c93f55" />
          </g>
          <g className="expressao desdem">
            <path d="M154 237 Q171 235 187 239 M213 226 Q230 207 247 222" fill="none" stroke="#b58a2f" strokeWidth="4" strokeLinecap="round" />
            <path d="M161 250 H183 A11 13 0 0 1 161 250Z M217 250 H239 A11 13 0 0 1 217 250Z" fill="#fff" />
            <path d="M171 250 H183 A6 8 0 0 1 171 250Z M227 250 H239 A6 8 0 0 1 227 250Z" fill="#4a7f5c" />
            <path d="M158 250 H186 M214 250 H242" stroke="#543c25" strokeWidth="4" strokeLinecap="round" />
            <path d="M181 310 Q202 311 222 299" fill="none" stroke="#c93f55" strokeWidth="6" strokeLinecap="round" />
          </g>
        </g>

        {/* Rômulo */}
        <g className="falante" aria-label="Tocar no Rômulo" {...personagem("romulo")}>
          {/* corpo */}
          <path d="M475 530 C475 420 515 385 600 380 C685 385 725 420 725 530Z" fill="#35648c" />
          <path d="M566 320 H634 V380 Q600 412 566 380Z" fill="#d99f78" />
          <path d="M566 378 Q600 415 634 378" fill="none" stroke="#264c6d" strokeWidth="7" />
          {/* orelhas e cabelo atrás */}
          <path d="M600 105 C515 105 505 175 513 245 H687 C695 175 685 105 600 105Z" fill="#5c3820" />
          <circle cx="519" cy="252" r="17" fill="#eab48c" />
          <circle cx="681" cy="252" r="17" fill="#eab48c" />
          {/* rosto */}
          <path d="M520 220 C520 130 680 130 680 220 V265 C680 315 640 347 600 347 C560 347 520 315 520 265Z" fill="#f2c29b" />
          {/* cabelo */}
          <path d="M513 232 C495 150 535 95 595 100 C650 85 705 140 687 232 C682 212 677 197 667 187 C635 197 590 192 562 172 C552 190 525 205 513 232Z" fill="#744a2b" />
          <path d="M560 145 Q595 120 645 135" fill="none" stroke="#8f613c" strokeWidth="5" strokeLinecap="round" />
          {/* face */}
          <path className="neutro" d="M550 226 Q568 216 585 225 M615 225 Q632 216 650 226" fill="none" stroke="#5c3820" strokeWidth="7" strokeLinecap="round" />
          <g className="olhos neutro">
            <ellipse cx="570" cy="250" rx="11" ry="11" fill="#fff" />
            <ellipse cx="630" cy="250" rx="11" ry="11" fill="#fff" />
            <circle cx="570" cy="251" r="8" fill="#65401f" />
            <circle cx="630" cy="251" r="8" fill="#65401f" />
            <circle cx="570" cy="251" r="4" fill="#222" />
            <circle cx="630" cy="251" r="4" fill="#222" />
          </g>
          <path d="M600 256 Q590 281 604 283" fill="none" stroke="#c98d64" strokeWidth="4" strokeLinecap="round" />
          <path className="neutro" d="M572 301 Q600 327 628 301" fill="none" stroke="#9c4e3c" strokeWidth="5" strokeLinecap="round" />
          <g className="expressao mau">
            <g fill="#fff"><circle cx="570" cy="251" r="11" /><circle cx="630" cy="251" r="11" /></g>
            <g fill="#65401f"><circle cx="573" cy="253" r="7" /><circle cx="627" cy="253" r="7" /></g>
            <g fill="#222"><circle cx="573" cy="253" r="3.5" /><circle cx="627" cy="253" r="3.5" /></g>
            <path d="M554 232 H590 V250 L554 238Z M646 232 H610 V250 L646 238Z" fill="#f2c29b" />
            <path d="M549 226 L588 245 M651 226 L612 245" fill="none" stroke="#5c3820" strokeWidth="9" strokeLinecap="round" />
            <path d="M596 225 L594 237 M604 225 L606 237" stroke="#c98d64" strokeWidth="3" strokeLinecap="round" />
            <path d="M564 293 Q600 301 636 293 Q632 331 600 333 Q568 331 564 293Z" fill="#7d2b2b" />
            <path d="M564 293 Q600 301 636 293 Q635 303 631 309 Q600 315 569 309 Q565 303 564 293Z" fill="#fff" />
            <path d="M582 327 Q600 314 618 327 Q600 337 582 327Z" fill="#e57373" />
            <path d="M564 293 Q600 301 636 293 Q632 331 600 333 Q568 331 564 293Z" fill="none" stroke="#9c4e3c" strokeWidth="4" strokeLinejoin="round" />
            <path d="M558 287 Q558 294 564 297 M642 287 Q642 294 636 297" fill="none" stroke="#c98d64" strokeWidth="3" strokeLinecap="round" />
          </g>
          <g className="expressao constrangido">
            <path d="M549 230 Q564 221 584 212 M616 212 Q636 221 651 230" fill="none" stroke="#5c3820" strokeWidth="7" strokeLinecap="round" />
            <g fill="#fff"><circle cx="570" cy="250" r="12" /><circle cx="630" cy="250" r="12" /></g>
            <g fill="#65401f"><circle cx="575" cy="255" r="6" /><circle cx="635" cy="255" r="6" /></g>
            <g fill="#ea7466" opacity=".55"><ellipse cx="549" cy="282" rx="17" ry="11" /><ellipse cx="651" cy="282" rx="17" ry="11" /></g>
            <path d="M574 310 Q583 300 592 309 T610 309 T628 305" fill="none" stroke="#9c4e3c" strokeWidth="5" strokeLinecap="round" />
            <path d="M662 190 C652 206 651 219 662 220 C673 219 672 206 662 190Z" fill="#74c5ed" stroke="#3f93bd" strokeWidth="2" />
          </g>
        </g>

        {/* Calopsita lutina: corpo branco-creme, rosto e crista amarelos, bochecha laranja, olho vermelho */}
        <g className="calopsita falante" aria-label="Tocar no Quincas" {...personagem("quincas")}>
          {/* cauda, atrás do poleiro */}
          <path d="M378 405 L383 535 L400 555 L417 535 L422 405Z" fill="#f7e9a6" />
          <path d="M400 440 V545" stroke="#e0cc7c" strokeWidth="3" />
          {/* crista */}
          <path d="M383 262 C372 225 378 195 402 168 C396 200 404 212 412 235 C416 215 426 202 440 195 C430 220 428 240 420 264Z" fill="#f8d53f" />
          {/* corpo e asas */}
          <path d="M400 290 C350 300 338 360 352 405 C362 440 385 452 400 452 C415 452 438 440 448 405 C462 360 450 300 400 290Z" fill="#fffbe9" />
          <path d="M356 325 C332 360 340 415 372 440 C380 400 376 355 356 325Z" fill="#f7eeb9" />
          {/* cabeça */}
          <circle cx="400" cy="288" r="45" fill="#fae36f" />
          <circle cx="366" cy="300" r="13" fill="#f28a34" />
          <circle cx="434" cy="300" r="13" fill="#f28a34" />
          <g className="olhos">
            <circle cx="379" cy="280" r="7" fill="#9c2430" />
            <circle cx="421" cy="280" r="7" fill="#9c2430" />
            <circle cx="381" cy="278" r="2.2" fill="#fff" />
            <circle cx="423" cy="278" r="2.2" fill="#fff" />
          </g>
          <path d="M387 293 Q400 283 413 293 Q412 312 400 320 Q388 312 387 293Z" fill="#e9bd9c" />
          <circle cx="395" cy="294" r="1.6" fill="#a87757" />
          <circle cx="405" cy="294" r="1.6" fill="#a87757" />
          <g className="asa">
            <path className="penas" d="M444 325 C418 355 404 400 402 432 Q409 440 415 432 Q416 452 425 454 Q432 450 433 442 Q439 460 447 456 Q454 448 453 438 Q462 446 467 436 C474 400 464 355 444 325Z" fill="#fffbe9" stroke="#e0cc7c" strokeWidth="2" strokeLinejoin="round" />
            <path className="penas" d="M415 432 L428 385 M433 442 L438 385 M453 438 L449 385" fill="none" stroke="#e0cc7c" strokeWidth="2" strokeLinecap="round" />
            <path d="M444 325 C468 360 460 415 428 440 C420 400 424 355 444 325Z" fill="#f7eeb9" />
          </g>
        </g>

        {/* Poleiro e pés */}
        <rect x="325" y="447" width="150" height="13" rx="6" fill="#8a5c38" />
        <g fill="none" stroke="#d99f91" strokeWidth="6" strokeLinecap="round">
          <path d="M378 444 V459 M386 444 V459" />
          <path className="pata-repouso" d="M414 444 V459 M422 444 V459" />
          <g className="pata-esticada">
            <path d="M425 432 L468 488 M468 488 L486 498 M468 488 L480 508 M468 488 L470 510" />
            <path d="M425 432 L442 454" stroke="#fffbe9" strokeWidth="20" />
          </g>
        </g>

        {/* Nomes */}
        <rect y="530" width="800" height="70" fill="#fff6df" />
        <text className="nome" x="200" y="575">Jessica</text>
        <text className="nome" x="400" y="575">Quincas</text>
        <text className="nome" x="600" y="575">Rômulo</text>

        {/* Balões de fala */}
        {Object.entries(BALOES).map(([quem, { x, y, contorno }]) => {
          const linhas = visiveis.find((fala) => fala.quem === quem)?.linhas;
          return (
            <g key={quem} className={linhas ? "balao visivel" : "balao"} aria-hidden="true">
              <path d={contorno} fill="#fff" stroke="#23423f" strokeWidth="3" strokeLinejoin="round" />
              {linhas?.map((linha, i) => (
                <text key={linha} className={quem === "quincas" ? undefined : "menor"} x={x} y={y + (i - (linhas.length - 1) / 2) * 29}>{linha}</text>
              ))}
            </g>
          );
        })}
      </svg>
      <p className="somente-leitor" role="status">{visiveis.at(-1)?.linhas.join(" ")}</p>
    </>
  );
}
