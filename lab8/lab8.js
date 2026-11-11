/**
 * CST3106 — Lab 08: Dice Rolling Animation with jQuery
 * ----------------------------------------------------
 * - jQuery is used for DOM manipulation and event handling.
 * - The die starts at 6 (set in HTML via data-value="6").
 * - On button click: fade the pips out, play the CSS "rolling"
 *   animation, then display a new random value between 1 and 6.
 * - Uses .one('animationend') so the update happens exactly once
 *   when the animation truly finishes.
 * - Respects prefers-reduced-motion: skips the animation but still
 *   rolls a new value.
 */
$(function () {
  'use strict';

  // ---- Cached jQuery-wrapped elements (efficient DOM access) ----
  const $die    = $('#die');
  const $btn    = $('#rollBtn');
  const $result = $('#result');

  // ---- Map each face value -> number of pips to render ----
  const FACE_PIPS = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6 };

  // ---- Guard against overlapping rolls (e.g. rapid double-clicks) ----
  let rolling = false;

  // ---- Detect the user's motion preference once ----
  const reduceMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    $die.attr('aria-label', 'Die showing ' + value);
    $result.text('Face value: ' + value);
  }

  /**
   * Returns a random integer between 1 and 6 (inclusive).
   */
  function randomFace() {
    return Math.floor(Math.random() * 6) + 1;
  }

  /**
   * Finishes a roll: paints the new face, cleans up state, re-enables the button.
   */
  function finishRoll() {
    renderFace(randomFace());
    $die.removeClass('rolling');
    $btn.prop('disabled', false).text('Roll');
    rolling = false;
  }

  // ---- Initial state: die shows 6 dots (as required by the lab) ----
  renderFace(6);

  // ---- Event Handling: attach click listener with jQuery ----
  $btn.on('click', function () {
    // Prevent a second roll while one is already in flight.
    if (rolling) return;
    rolling = true;

    $btn.prop('disabled', true).text('Rolling…');

    // Accessibility: honor reduced-motion — skip the visual sequence.
    if (reduceMotion) {
      finishRoll();
      return;
    }

    // Fade the pips out, then run the shake and update on animationend.
    $die.find('.pip').fadeOut(120, function () {
      $die
        .empty()
        .addClass('rolling')
        .one('animationend', finishRoll);
    });
  });
});