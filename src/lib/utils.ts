const POPPER_MAX_HEIGHT = 320
const TODO_KEYWORD_MIN_WIDTH = 250

export const sameWidthPopperOptions = {
	placement: 'bottom',
	modifiers: [
		{
			name: 'sameWidth',
			enabled: true,
			fn: ({ state }: any) => {
				state.styles.popper.width = `${state.rects.reference.width}px`;
				// state.styles.popper.maxHeight = `${POPPER_MAX_HEIGHT}px`;
				// state.styles.popper.overflow = 'auto';
			},
			phase: 'beforeWrite',
			requires: ['computeStyles'],
			effect({ state }: any) {
				state.elements.popper.style.width = `${state.elements.reference.offsetWidth}px`;
			}
		}
	]
};