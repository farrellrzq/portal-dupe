import React from 'react'

export default function government() {
    const gprKominfoHTML = `
    <div id="gpr-kominfo-widget-container" class="h-[37rem] my-6"></div>
    <script type="text/javascript" src="https://widget.kominfo.go.id/gpr-widget-kominfo.min.js"></script>
`;
  return (
    <div className="lg:w-1/4 w-full grid grid-cols-1 p-8">
        <div className="relative">
        <div className="rounded-2.5xl border border-jacarta-100 bg-white p-2">
            <h3 className="my-3 font-display text-center text-md text-jacarta-700 dark:text-black">
            Government Public Relation
            </h3>
            <div dangerouslySetInnerHTML={{ __html: gprKominfoHTML }} />
        </div>
        </div>
    </div>
  )
}