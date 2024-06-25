import { useState, useEffect, useCallback, useRef } from "react";
import Input from "./Input";

export default function CypherRing({ correctAnswer, navigate }) {
  const [degree, setDegree] = useState(0);
  const [isDragging, setIsDragging] = useState(0);
  const [selected, setSelected] = useState(null);

  const origin = useRef();

  const handleMouseDown = useCallback((e) => {
    origin.current = e.clientX;
    setIsDragging(true);
  }, []);

  const findNearestGlyph = () => {
    const { bottom: chevronBottom, right: chevronRight } = document
      .querySelector("#chevron_x5F_light")
      .getBoundingClientRect();

    const glyphs = document.querySelectorAll("#cypher > g");
    const nearest = { el: null, distance: Number(Infinity) };

    for (const g of glyphs) {
      const { top: glyphTop, right: glyphRight } = g.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.abs(chevronBottom - glyphTop) + Math.abs(chevronRight - glyphRight)
      );

      if (distance < nearest.distance) {
        nearest.el = g.getAttribute("id");
        nearest.distance = distance;
      }
    }

    if (nearest.distance < 6) {
      setSelected(nearest.el);
    } else {
      setSelected(null);
    }
  };

  const handleMouseUp = (e) => {
    setIsDragging(false);
    findNearestGlyph();
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) {
        return;
      }
      setDegree(degree + (e.clientX - origin.current));
    },
    [isDragging]
  );

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDragging, handleMouseDown, handleMouseUp, handleMouseMove]);

  return (
    <section>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        id="wrapper"
        enable-background="new 0 0 527.2 526.3"
        viewBox="0 0 527.2 526.3"
      >
        <filter id="sofGlow" width="300%" height="300%" x="-50%" y="-50%">
          <feMorphology
            in="SourceAlpha"
            operator="dilate"
            radius="2"
            result="thicken"
          />
          <feGaussianBlur in="thicken" result="blurred" stdDeviation="10" />
          <feFlood flood-color="#00BAFF" result="glowColor" />
          <feComposite
            in="glowColor"
            in2="blurred"
            operator="in"
            result="softGlow_colored"
          />
          <feMerge>
            <feMergeNode in="softGlow_colored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <g id="Main_gate_parts">
          <radialGradient
            id="SVGID_1_"
            cx="263.7"
            cy="263.3"
            r="230.8"
            gradientTransform="matrix(1 0 0 -1 0 528)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".519" stop-color="#fff" stop-opacity="0" />
            <stop offset="1" stop-color="#504213" />
          </radialGradient>
          <path
            fill="url(#SVGID_1_)"
            stroke="#745d00"
            stroke-miterlimit="10"
            d="M263.7 33.9c-127.5 0-230.8 103.3-230.8 230.8s103.3 230.8 230.8 230.8 230.8-103.3 230.8-230.8S391.2 33.9 263.7 33.9zm0 426c-107.8 0-195.2-87.4-195.2-195.2S155.9 69.5 263.7 69.5s195.2 87.4 195.2 195.2-87.4 195.2-195.2 195.2z"
          />
          <radialGradient
            id="SVGID_2_"
            cx="263.7"
            cy="263.3"
            r="256.7"
            gradientTransform="matrix(1 0 0 -1 0 528)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".519" stop-color="#fff" stop-opacity="0" />
            <stop offset="1" stop-color="#504213" />
          </radialGradient>
          <path
            fill="url(#SVGID_2_)"
            stroke="#000"
            stroke-miterlimit="10"
            d="M263.7 8C121.9 8 7 122.9 7 264.7s114.9 256.7 256.7 256.7 256.7-114.9 256.7-256.7S405.5 8 263.7 8zm0 495.6c-131.9 0-238.8-106.9-238.8-238.8S131.8 25.9 263.7 25.9s238.8 106.9 238.8 238.8-106.9 238.9-238.8 238.9z"
          />
        </g>
        <radialGradient
          id="SVGID_3_"
          cx="264.25"
          cy="262.75"
          r="239.35"
          gradientTransform="matrix(1 0 0 -1 0 528)"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset=".519" stop-color="#fff" stop-opacity="0" />
          <stop offset="1" stop-color="#504213" />
        </radialGradient>
        <path
          fill="url(#SVGID_3_)"
          d="M264.2 25.9C132 25.9 24.9 133.1 24.9 265.3S132 504.6 264.2 504.6s239.4-107.2 239.4-239.4S396.4 25.9 264.2 25.9zm-1.3 469.7c-127.1 0-230.1-103-230.1-230.1s103-230.1 230.1-230.1S493 138.4 493 265.5 390 495.6 262.9 495.6z"
        />
        <g id="cypher" style={{ transform: `rotate(${degree}deg)` }}>
          <g id="Virgo">
            <path
              id="path5631"
              d="M335.5 64.6l-5.7-.5-.5.2-4.8 5.9-.3.5.9.7.3-.5 4.8-5.9-.5.2 5.7.5.6.1.1-1.2h-.6zm-10.4-4.7l4.6.8 6.8.8.6.1.1-1.1-.6-.1-6.8-.8-4.5-.8-.6-.1-.2 1.1.6.1z"
              class="st3"
            />
            <path
              id="path5633"
              d="M330.4 64.5v-4.6h-1.1V65h1.1v-.5z"
              class="st3"
            />
            <path
              id="path5635"
              d="M336.4 63.5l1.7 2.4.1-.8-4.2 3.8.1-.1-1.9 1.1.8.6.1-.9-.4.5 2-.5.4-.4 3.6-11.5.2-.5-1.1-.4-.2.6-3.6 11.5.4-.4-2 .5-.4.5-.1.9.9.5 1.9-1.1.1-.1L339 66v-.8l-1.7-2.3-.3-.5-.9.7.3.4z"
              class="st3"
            />
            <path
              id="path10068"
              d="M325.1 59.4l-.7-1.7-.7 2.8 1.4-1.1z"
              class="st3"
            />
            <path
              id="path10070"
              d="M325 70.6l-1.8.1 2 1.8-.2-1.9z"
              class="st3"
            />
          </g>
          <g id="Serpens">
            <path
              id="path1935_2_"
              d="M441.2 135.1v5.5l.3-.5-4.8 2.6-.3.5v9.5h1.2v-.6l-.1-8.9-.3.5 4.9-2.6.3-.5-.1-5.5v-.5h-1.1v.5z"
              class="st3"
            />
            <path
              id="path2824"
              d="M441.8 135.4l-1.3-1.3h2.5l-1.2 1.3z"
              class="st3"
            />
            <path id="path2826" d="M437 151.9l1.1 1h-2.3l1.2-1z" class="st3" />
          </g>
          <g id="Scutum">
            <path
              id="path1932_1_"
              d="M483.8 269.6l-5.6 3.2.1-.1-9.8 3.1v1.1l10.5 3.7.8-.6-.7-6.6-.1-.6-1.1.1.1.6.6 6.6.8-.6-10.6-3.7v1.1l9.8-3.1h.1l5.6-3.2.5-.3-.5-1-.5.3z"
              class="st3"
            />
            <path
              id="path2821_1_"
              d="M475.7 272.3l2-.8.5-.2-.4-1-.5.2-2 .7-.6.2.4 1.1.6-.2z"
              class="st3"
            />
            <path
              id="path3708"
              d="M484.2 269.9v-1.7l1.9 2.9-1.9-1.2z"
              class="st3"
            />
          </g>
          <g id="Capricornus">
            <path
              id="path10954"
              d="M434.4 394.4l-3.1 9.6.6-.4-9-.7.4.1-3.9-3.7-.3 1 15.1-3.7.6-.1-.3-1.1-.5.1-15.1 3.7-.3.9 3.9 3.8.3.1 9 .8.6-.4 3.1-9.6.1-.6-1.1-.3-.1.5z"
              class="st3"
            />
          </g>
          <g id="Pegasus">
            <path
              id="path4681"
              d="M307.6 479.7v-3.3l-.2.4 5.4-5.1.2-.4.6-7.4v-.6l-1.1-.1-.1.6-.6 7.4.2-.3-5.4 5.1-.2.4v3.9h1.2v-.6z"
              class="st3"
            />
            <path
              id="path5568"
              d="M318.5 471.6l-.6 2.3.2-.3-6 4.2-.3.5v3.1h1.1v-.6l.1-2.5-.3.4 6-4.2.3-.3.6-2.3.2-.6-1.2-.3-.1.6z"
              class="st3"
            />
            <path
              id="path6455"
              d="M312.4 471.9l5.3 2.1.5.2.4-1.1-.5-.2-5.3-2-.5-.3-.5 1.1.6.2z"
              class="st3"
            />
            <path
              id="path7342"
              d="M317.9 467.4h2.7l.5-.9-1.5-2.2h-1l-1.2 2.2.5.9zm.8-2.4l1.5 2.2.5-.9H318l.5.9 1.2-2.2h-1z"
              class="st3"
            />
          </g>
          <g id="Triangulum">
            <path
              id="path12805"
              d="M176.6 467.1l-4.1-10.8-.6.8 20.3 1.7-.2-1.1-16.2 9.1.8.3zm15.8-9.4l-20.3-1.7-.6.8 4.1 10.8.8.3 16.2-9.1-.2-1.1z"
              class="st3"
            />
          </g>
          <g id="Taurus">
            <path
              id="path20183"
              d="M73.1 376.2l15.8-5.2.6-.2-.4-1.1-.6.2-15.8 5.2-.5.2.3 1.1.6-.2z"
              class="st3"
            />
            <path
              id="path20185"
              d="M81.4 372.1l-9.6-2.8-.5-.2-.3 1.1.5.2 9.6 2.8.5.2.3-1.1-.5-.2z"
              class="st3"
            />
            <path
              id="path21957"
              d="M71.9 370l-.5-1.7-.9 2.6 1.4-.9z"
              class="st3"
            />
            <path
              id="path22844"
              d="M73 375.4l-1.5-.5 1.2 2.4.3-1.9z"
              class="st3"
            />
            <path
              id="path23731"
              d="M88.4 370.6l.5-1.8 1 2.4-1.5-.6z"
              class="st3"
            />
          </g>
          <g id="Canis">
            <path
              id="path1932_5_"
              d="M57 250l-4.1-20.6-.9-.3-8.2 6.8.2 1 20 5.4-.3-.9-7.8 8.4 1.1.2zm7.3-8.8l-20-5.4.2 1 8.2-6.8-.9-.3 4.1 20.6 1 .3 7.7-8.4-.3-1z"
              class="st3"
            />
          </g>
          <g id="Lynx">
            <path
              id="path11883"
              d="M103 110.8l7.2 1.6-.3-.3 1.5 2-.1-.2.8 2.5-.1-.2v6.5l.3.5 2.1 1.2.2.1 4.4.6h.6l.1-1.1-.6-.1-4.3-.5.2.1-2.1-1.3.3.5V116l-.8-2.4-.1-.2-1.5-1.9-.3-.3-7.3-1.5-.5-.1-.3 1.1.6.1z"
              class="st3"
            />
            <path
              id="path13657"
              d="M103.5 110.3l-.8-1.6-.8 2.7 1.6-1.1z"
              class="st3"
            />
            <path
              id="path14544"
              d="M118.8 124.4l1.3-.9-.6 2.6-.7-1.7z"
              class="st3"
            />
          </g>
          <g id="Leo">
            <path
              id="path26243"
              d="M220.5 50.7l2.9 3.9.8.1 3-2.7-.2.2 9.8-2.8-.7-.8-1.4 3.3-.1.4 2 8.6.1.2 1.2 1.6.6-.9-2.4-.2.4.9 1.1-1.3.3-.4-.9-.7-.3.4-1.1 1.3.4.9 2.3.3.6-1-1.3-1.6.1.2-1.9-8.6-.1.4 1.4-3.4-.7-.7-9.7 2.8-.2.1-3 2.6.8.1-2.9-3.9-.4-.5-.9.7.4.5z"
              class="st3"
            />
            <path
              id="path27130"
              d="M226 52.5l2.8 8.4.1.6 1.1-.4-.1-.5-2.8-8.5-.2-.5-1.1.3.2.6z"
              class="st3"
            />
            <path id="path28017" d="M221.2 50.6l.2-2-2.2 2h2z" class="st3" />
            <path
              id="path28904"
              d="M229.2 60.4l-.8 1.9 2.3-.8-1.5-1.1z"
              class="st3"
            />
          </g>
          <path
            id="Inner_Chevron_Delimiters"
            fill="none"
            stroke="#745d00"
            d="M245.2 35.1l2.8 35.1M208.6 41l8.4 34.2m-43.6-22.4l13.8 32.4M140.6 70l18.8 29.8m-48.5-7.5l23.4 26.3m-49.1.4l27.3 22.3m-48.3 8.2l30.5 17.6M48.3 183l32.9 12.5M38 218.6l34.5 7.1m-39 29.7l35.2 1.4M35 292.5l34.9-4.3m-27.5 40.6l33.8-9.8m-20.7 44.5l31.8-15.1m-13.2 47.2l28.9-20m-5.5 48.7l25.4-24.4m2.4 49l21.1-28.2m10.2 48l16.4-31.2m17.7 45.7l11.1-33.4m24.9 42.3l5.6-34.7m31.3 37.7v-35.2m37 32.2l-5.7-34.7m41.7 25.9l-11.2-33.4m45.3 18.9l-16.4-31.2m47.7 11.3l-21.1-28.1m48.9 3.6L404.4 400m48.8-4.3l-28.9-20m47.5-12.1L440 348.5m45-19.6l-33.9-9.8m41.3-26.5l-35-4.3m36.5-32.8l-35.2 1.5m30.7-38.3l-34.5 7.1m24.2-42.7l-32.9 12.5m17.1-46l-30.5 17.6m9.4-48.1l-27.3 22.3m1.6-49.1l-23.3 26.4m-6.3-48.6l-18.8 29.7m-14-47l-13.8 32.4m-21.4-44.1l-8.4 34.1m-28.2-40.1l-2.8 35.1"
          />
        </g>
        <path
          id="Outer_Chevron_Delimiters"
          fill="none"
          stroke="#44390a"
          stroke-miterlimit="10"
          d="M263.7 25.9v8m-8.1-7.9l.2 8m-8.4-7.6l.6 8m-8.6-7.3l.8 8m-8.9-7l1.1 7.9m-9.2-6.7l1.4 7.9m-9.3-6.3l1.6 7.8m-9.6-6.1l1.9 7.8m-9.7-5.7l2.1 7.7m-9.9-5.4l2.4 7.6m-10.1-5l2.6 7.5m-10.2-4.7l2.9 7.5m-10.4-4.4l3.1 7.4m-10.6-4l3.5 7.2m-10.7-3.6l3.6 7.1M147 56.3l3.9 7M140 60.4l4.1 6.9m-11-2.5l4.4 6.6m-11.1-2.1l4.6 6.6m-11.2-1.8l4.8 6.4m-11.2-1.4l5 6.2m-11.2-1l5.2 6.1m-11.3-.6l5.5 5.8m-11.3-.2l5.6 5.7m-11.3.1l5.8 5.5m-11.3.5l6.1 5.3m-11.3.9l6.2 5.1m-11.3 1.3l6.4 4.9M69 126.3l6.6 4.7m-11.2 2.1l6.7 4.4m-11 2.4l6.8 4.2m-11 2.8l7 4M52.1 154l7 3.7m-10.7 3.6l7.2 3.5M45 168.7l7.3 3.2m-10.4 4.3l7.4 2.9M39 183.8l7.5 2.7m-10.1 5l7.6 2.4m-10 5.4l7.7 2.1m-9.8 5.7l7.8 1.9m-9.6 6l7.8 1.7m-9.4 6.3l7.9 1.4m-9.1 6.6l7.9 1.2m-9 6.9l8 .8m-8.7 7.3l8 .6m-8.4 7.5l7.9.3m-8.1 7.8l8 .1m-7.9 9.4l8-.3m-7.6 8.4l8-.6m-7.3 8.7l8-.8m-7 8.8L35 296m-6.7 9.2l7.9-1.4m-6.4 9.4l7.9-1.7m-6.1 9.6l7.8-1.9m-5.7 9.7l7.7-2.1m-5.4 9.9l7.6-2.4m-5 10.1l7.5-2.6m-4.7 10.3l7.4-3m-4.3 10.5l7.3-3.2m-4 10.6l7.3-3.5m-3.7 10.8l7.2-3.7m-3.3 10.8l7-3.9m-2.9 10.9l6.8-4.1m-2.5 11l6.7-4.4M68.3 402l6.5-4.6m-1.7 11.2l6.3-4.8M78.1 415l6.2-5m-1 11.2l6-5.2m-.6 11.3l5.9-5.5m-.3 11.4l5.7-5.7m.2 11.3l5.5-5.8m.5 11.3l5.3-6m.9 11.2l5.1-6.2m1.3 11.3l4.8-6.4m1.7 11.2l4.6-6.5M132 464l4.4-6.7m2.5 11.1l4.1-6.9m2.9 11l3.9-7m3.2 10.9l3.7-7.1m3.6 10.7l3.4-7.2m4 10.6l3.2-7.3m4.3 10.4l2.9-7.4m4.7 10.3l2.7-7.5m4.9 10.2l2.5-7.7m5.3 10l2.2-7.7m5.7 9.8l1.9-7.8m6 9.6l1.6-7.8m6.4 9.4l1.4-7.9m6.6 9.2l1.1-8m7 9l.8-8m7.2 8.7l.6-8m7.6 8.5l.3-8m9.1 8.2v-8m8.1 7.8l-.3-8m8.4 7.6l-.5-8m8.6 7.3l-.8-7.9m8.9 7l-1.1-8m9.1 6.7l-1.3-7.9m9.3 6.4l-1.6-7.8m9.5 6l-1.8-7.8m9.7 5.8l-2.1-7.7m9.9 5.3l-2.4-7.6m10.1 5.1l-2.7-7.6M351 487l-2.9-7.4m10.4 4.3l-3.1-7.3m10.5 4l-3.4-7.3m10.7 3.7l-3.7-7.1m10.9 3.2l-3.9-7m10.9 2.9l-4.2-6.8m11.1 2.5l-4.4-6.7m11.1 2.1l-4.6-6.5m11.2 1.8l-4.9-6.4m11.3 1.4l-5.1-6.3m11.3 1l-5.2-6m11.3.6l-5.5-5.9m11.3.3l-5.6-5.7m11.3-.2l-5.9-5.4m11.3-.6l-6-5.2m11.3-1l-6.2-5m11.2-1.4l-6.3-4.8m11.2-1.7l-6.6-4.6m11.1-2.1l-6.6-4.4m11-2.5l-6.8-4.1m10.9-2.9l-6.9-3.9m10.8-3.2l-7.1-3.7m10.8-3.6l-7.2-3.4m10.6-3.9l-7.4-3.2m10.5-4.3l-7.4-3m10.3-4.6l-7.5-2.7m10.1-5l-7.6-2.5m10-5.3l-7.7-2.2m9.8-5.7l-7.8-1.9m9.6-6l-7.8-1.6m9.3-6.3l-7.8-1.4m9.1-6.7l-7.9-1.1m8.9-6.9l-7.9-.9m8.7-7.2l-8-.6m8.4-7.5l-8-.4m8.2-7.8h-8m8-6.8l-8 .2m7.6-8.3l-8 .5m7.4-8.6l-7.9.7m7.1-8.8l-8 1m6.8-9l-7.9 1.2m6.5-9.2l-7.9 1.5m6.2-9.5l-7.8 1.8m5.8-9.7l-7.7 2.1m5.5-9.9l-7.7 2.3m5.2-10l-7.6 2.6m4.8-10.3l-7.4 2.9m4.4-10.4l-7.4 3.1m4.1-10.5l-7.2 3.3m3.7-10.7l-7.1 3.6m3.4-10.8l-7.1 3.9m3-10.9l-6.9 4m2.7-11l-6.8 4.3m2.3-11l-6.6 4.5m1.9-11.2l-6.5 4.8m1.5-11.2l-6.2 5m1.1-11.3l-6.1 5.2m.7-11.3l-5.9 5.4m.4-11.3l-5.8 5.6m0-11.4l-5.5 5.8m-.5-11.3l-5.3 6m-.8-11.3l-5.1 6.1m-1.2-11.2l-4.9 6.3m-1.6-11.2l-4.7 6.5m-2-11.2l-4.4 6.6m-2.4-11l-4.2 6.8m-2.7-11l-4 6.9m-3.1-10.9l-3.8 7.1m-3.4-10.8l-3.6 7.2m-3.8-10.7l-3.3 7.3m-4.1-10.5l-3.1 7.4m-4.5-10.4l-2.8 7.5m-4.9-10.2l-2.5 7.6m-5.2-10l-2.3 7.6m-5.6-9.8l-2 7.7m-5.9-9.6l-1.7 7.8M308 30l-1.5 7.9m-6.9-9.2l-1.2 7.9m-7.6-9.1l-1 7.9m-7.7-8.7l-.7 7.9m-8.5-8.3l-.4 8"
        />
        <g id="chevrons">
          <g id="Chevron_Locks_1_">
            <g id="Chevron_Lock_1_1_">
              <radialGradient
                id="SVGID_4_"
                cx="263.4"
                cy="501.7"
                r="51.295"
                gradientTransform="matrix(1 0 0 -1 0 528)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#9b7d39" />
                <stop offset="1" stop-color="#504213" />
              </radialGradient>
              <path
                fill="url(#SVGID_4_)"
                stroke="#745d00"
                stroke-width=".75"
                d="M269.5 49.3l18.6-37.2c15.1-.5 44.1 2.9 44.1 2.9v-2.9S314 3.3 281.3 3.3l-13.7 35.9h-8.4L245.5 3.3c-32.7 0-50.9 8.8-50.9 8.8V15s29.1-3.5 44.1-2.9l18.6 37.2h12.2z"
              />
              <radialGradient
                id="SVGID_5_"
                cx="263.361"
                cy="510.7"
                r="16.774"
                gradientTransform="matrix(1 0 0 -1 0 528)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#9b7d39" />
                <stop offset="1" stop-color="#504213" />
              </radialGradient>
              <path
                fill="url(#SVGID_5_)"
                stroke="#745d00"
                stroke-width=".5"
                d="M279.9.3l-12.5 34.1h-8.1L246.9.2l33 .1z"
              />
              <linearGradient
                id="chevron_x5F_light_4_"
                x1="263.15"
                x2="263.15"
                y1="504.559"
                y2="527.5"
                gradientTransform="matrix(1 0 0 -1 0 528)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#009bd5" />
                <stop offset="1" stop-color="#007aa9" />
              </linearGradient>
              <path
                id="chevron_x5F_light"
                fill="url(#chevron_x5F_light_4_)"
                d="M273.9.5l-7.8 22.9h-6L252.4.5"
              />
            </g>
          </g>
        </g>
        <g filter="url(#sofGlow)">
          <radialGradient
            id="SVGID_18_"
            cx="262.7"
            cy="262.3"
            r="195.7"
            gradientTransform="matrix(1 0 0 -1 0 528)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#0079c0" />
            <stop offset=".298" stop-color="#007cc2" />
            <stop offset=".499" stop-color="#0085c9" />
            <stop offset=".672" stop-color="#0094d5" />
            <stop offset=".828" stop-color="#00a9e5" />
            <stop offset=".973" stop-color="#00c5fa" />
            <stop offset="1" stop-color="#00cbff" />
          </radialGradient>
          <circle cx="262.7" cy="265.7" r="195.7" fill="url(#SVGID_18_)" />
        </g>
      </svg>
      <Input
        selected={selected}
        setSelected={setSelected}
        correctAnswer={correctAnswer}
        navigate={navigate}
      />
    </section>
  );
}
