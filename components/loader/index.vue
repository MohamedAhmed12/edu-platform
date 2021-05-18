<template>
  <div class="col-md-12 text-center m-auto">
    <svg
      height="90px"
      preserveAspectRatio="xMidYMid"
      style="
        margin: auto;
        background: none;
        display: block;
        shape-rendering: auto;
      "
      viewBox="0 0 100 100"
      width="80px"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path
          id="path"
          d="M50 15A15 35 0 0 1 50 85A15 35 0 0 1 50 15"
          fill="none"
        />
        <path
          id="patha"
          d="M0 0A15 35 0 0 1 0 70A15 35 0 0 1 0 0"
          fill="none"
        />
      </defs>
      <g transform="rotate(0 50 50)">
        <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
      </g>
      <g transform="rotate(60 50 50)">
        <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
      </g>
      <g transform="rotate(120 50 50)">
        <use stroke="#dfdfdf" stroke-width="3" xlink:href="#path" />
      </g>
      <g transform="rotate(0 50 50)">
        <circle cx="50" cy="15" fill="#e15b64" r="9">
          <animateMotion begin="0s" dur="1s" repeatCount="indefinite">
            <mpath xlink:href="#patha" />
          </animateMotion>
        </circle>
      </g>
      <g transform="rotate(60 50 50)">
        <circle cx="50" cy="15" fill="#f8b26a" r="9">
          <animateMotion
            begin="-0.16666666666666666s"
            dur="1s"
            repeatCount="indefinite"
          >
            <mpath xlink:href="#patha" />
          </animateMotion>
        </circle>
      </g>
      <g transform="rotate(120 50 50)">
        <circle cx="50" cy="15" fill="#abbd81" r="9">
          <animateMotion
            begin="-0.3333333333333333s"
            dur="1s"
            repeatCount="indefinite"
          >
            <mpath xlink:href="#patha" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  </div>
</template>

<script>
export default {};
</script>
<style scoped></style>
