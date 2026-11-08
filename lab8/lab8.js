/**
 * CST3106 — Lab 08: Dice Rolling Animation with jQuery
 * ----------------------------------------------------
 * - jQuery is used for DOM manipulation and event handling.
 * - The die starts at 6 (set in HTML via data-value="6").
 * - On button click: play the CSS "rolling" animation, then
 *   display a new random value between 1 and 6.
 * - Uses .one('animationend') so the update happens exactly
 *   once when the animation truly finishes.
 */
$(function () {
  'use strict';

  // Cache jQuery-wrapped elements (efficient DOM access).
  const $die    = $('#die');
  const $btn    = $('#rollBtn');
  const $result = $('#result');

  // Map each face value -> number of pips to render.
  const FACE_PIPS = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };

  /**
   * Renders a die face with the correct number of pips.
   * @param {number} value - 1..6
   */
  function renderFace(value) {
    const pipCount = FACE_PIPS[value];

    // Rebuild pips via jQuery, then set data-value so CSS places them.
    $die.empty();
    for (let i = 0; i < pipCount; i++) {
      $die.append('<span class="pip"></span>');
    }
    $die.attr('data-value', value);
    $result.text('Face value: ' + value);
  }

  /**
   * Returns a random integer between 1 and 6 (inclusive).
   */
  function randomFace() {
    return Math.floor(Math.random() * 6) + 1;
  }

  // ---- Initial state: die shows 6 dots (as required by the lab) ----
  renderFace(6);

  // ---- 4. Event Handling: attach click listener with jQuery ----
  $btn.on('click', function () {
    // Prevent overlapping rolls while the animation runs.
    $btn.prop('disabled', true).text('Rolling…');

    // Hide current pips for a clean transition into the shake.
    $die.empty();

    // Trigger the CSS rolling animation, then update once it ends.
    $die
      .addClass('rolling')
      .one('animationend', function () {
        // 3. Dice Rolling: show a new random value at the end.
        const value = randomFace();
        renderFace(value);

        // Clean up: remove animation class, re-enable the button.
        $die.removeClass('rolling');
        $btn.prop('disabled', false).text('Roll');
      });
  });
});