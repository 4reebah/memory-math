import { useState } from "react";
const Instructions = ({ close }) => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-yellow-50 p-8 rounded-lg max-w-xl">
          <div class="flex items-center justify-between p-4 md:p-5 border-b border-gray-900 rounded-t ">
            <h3
              class="text-xl font-medium text-gray-900"
              style={{ fontFamily: "Delius Unicase, cursive" }}
            >
              HOW TO PLAY MEMORY MATH-O-RAMA?
            </h3>
            <button
              onClick={close}
              class="text-black bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              data-modal-hide="medium-modal"
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div class="p-4 text-lg space-y-4">
            <p class=" text-gray-900">
              To play the game, flip over the tiles that correctly answer the
              question at the top. If you flip over the two correct tiles, those
              tiles will turn green. If you flip over the incorrect ones, those
              tiles will flip back. Play until all the tiles turn green!
            </p>
            <p class=" text-gray-900">
              The game will track your time and the number of mistakes you make.
              If you log in, your best stastics will be saved.
            </p>
            <p class=" text-gray-900">
              If you get stuck, you can use the HINT button to view the tiles
              for ten seconds for a time penalty of five seconds. You can also
              use the SOLVE button to flip over the tiles that correctly answer
              the question for a time penalty of thirty seconds. You can't use
              SOLVE and HINT at the same time.
            </p>
            <p class=" text-gray-900">Enjoy the game!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
