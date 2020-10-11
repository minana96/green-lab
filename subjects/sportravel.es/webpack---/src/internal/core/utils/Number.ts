/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Ordering } from "./Order";


/**
 * ============================================================================
 * COMPARING FUNCTIONS
 * ============================================================================
 * @hidden
 */

/**
 * Comparing function used for ordering.
 *
 * @ignore Exclude from docs
 * @param a  Number 1
 * @param b  Number 2
 * @return Result
 */
export function order(a: number, b: number): Ordering {
	if (a === b) {
		return 0;

	} else if (a < b) {
		return -1;

	} else {
		return 1;
	}
}



// WEBPACK FOOTER //
// ../../../../../src/.internal/core/utils/Number.ts