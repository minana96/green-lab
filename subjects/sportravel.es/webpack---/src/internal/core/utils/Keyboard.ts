/**
 * A collection of keyboard-related utilities accessible via `keyboard`
 * instance.
 */

/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import * as $type from "./Type";

/**
 * Represents named (usually frequently used) keyboard keys for easy referece.
 */
export type KeyboardKeys =
	"up"
	| "down"
	| "left"
	| "right"
	| "enter"
	| "esc"
	| "home"
	| "tab"
	| "end"
	| "ctrl"
	| "alt"
	| "shift"
	| "space"
	| "home"
	| "end"
	| "pgup"
	| "pgdn"
	| "ins"
	| "del"
	| "plus"
	| "minus"
	| "other";

/**
 * A class that represents collection of keyboard-related utilities.
 *
 * Do not instantiate this class directly, but rather use `keyboard` variable.
 */
export class Keyboard {

	/**
	 * Returns a named key based on information contained in the event or
	 * "other".
	 *
	 * @param ev  A keyboard event
	 * @return Keyboard named key
	 */
	public getEventKey(ev: KeyboardEvent): KeyboardKeys {

		// Get the key code
		let code: number = ev.keyCode || ev.which,
			key: KeyboardKeys;

		// Map to internal key
		switch (code) {
			case 38:  key = "up";    break;
			case 40:  key = "down";  break;
			case 37:  key = "left";  break;
			case 39:  key = "right"; break;
			case 13:  key = "enter"; break;
			case 27:  key = "esc";   break;
			case 36:  key = "home";  break;
			case 35:  key = "end";   break;
			case 9:   key = "tab";   break;
			case 17:  key = "ctrl";  break;
			case 18:  key = "alt";   break;
			case 16:  key = "shift"; break;
			case 32:  key = "space"; break;
			case 36:  key = "home";  break;
			case 35:  key = "end";   break;
			case 33:  key = "pgup";  break;
			case 34:  key = "pgdn";  break;
			case 45:  key = "ins";   break;
			case 46:  key = "del";   break;
			case 107: key = "plus";  break;
			case 109: key = "minus"; break;
			default:  key = "other"; break;
		}

		return key;
	}

	/**
	 * Checks if event key is one or more of the selected named keys.
	 *
	 * @param ev   Keyboard event
	 * @param key  Named key or array of keys
	 * @return Is event key one of the list?
	 */
	public isKey(ev: KeyboardEvent, key: string | string[]): boolean {
		let eventKey = this.getEventKey(ev);
		if ($type.isString(key)) {
			key = [key];
		}
		return key.indexOf(eventKey) !== -1;
	}

	/**
	 * Returns `true` if shift key was presset at the moment of the event.
	 *
	 * @param ev  Event object
	 * @return Was shift pressed?
	 */
	public shiftKey(ev: KeyboardEvent | MouseEvent): boolean {
		return ev.shiftKey;
	}

	/**
	 * Returns `true` if ctrl key was presset at the moment of the event.
	 *
	 * @param ev  Event object
	 * @return Was ctrl pressed?
	 */
	public ctrlKey(ev: KeyboardEvent | MouseEvent): boolean {
		return ev.ctrlKey;
	}

	/**
	 * Returns `true` if alt key was presset at the moment of the event
	 * @param ev  Event object
	 * @return Was alt pressed?
	 */
	public altKey(ev: KeyboardEvent | MouseEvent): boolean {
		return ev.altKey;
	}

	/**
	 * Returns `true` if meta key was presset at the moment of the event
	 * @param ev  Event object
	 * @return Was meta pressed?
	 */
	public metaKey(ev: KeyboardEvent | MouseEvent): boolean {
		return ev.metaKey;
	}

}

/**
 * A single [[Keyboard]] instance to be reused across all elements so that
 * they don't need to instantiate their own.
 *
 * @ignore Exclude from docs
 */
export let keyboard = new Keyboard();



// WEBPACK FOOTER //
// ../../../../../src/.internal/core/utils/Keyboard.ts