// define possible labels for current tutorial (uiJoyrideValue)
const fileTutorialLabel = 'fileTutorial';
const collectionsTutorialLabel = 'collectionsTutorial';
const indivGroupsCreationTutorialLabel = 'indivGroupsCreationTutorial';
const indivGroupsEditionTutorialLabel = 'indivGroupsEditionTutorial';

/**
*	build every step of a tutorial according to previous and current state
*	@param {object} previousState
*	@param {object} currentState
*	@return {array} steps - an array of states, possibly empty
*/
const buildTutorialSteps = function(previousState, currentState) {
	// "steps" is an array of tutorial steps
	const steps = [];

	// if we are transitioning from a tutorial value to another
	if (
		// the values are differing from last state
		(previousState.uiJoyrideTutorialValue !== currentState.uiJoyrideTutorialValue)
		// the new value exists
		&& currentState.uiJoyrideTutorialValue
		// and we have at least one tutorial to display
		&& (
			currentState.firstTimeFile
			|| currentState.firstTimeCollection
			|| currentState.firstTimeIndivCreate
			|| currentState.firstTimeIndivEdit
		)
	) {
		const normalColor = '#24d390';
		const indivColor = '#f5e462';
		const currentColor = currentState.indiv ? indivColor : normalColor;
		const predefinedSteps = {
			// "file" steps
			fileStep1: {
				title: 'Merged export',
				text: 'Will export your font without overlapping shapes',
				selector: '#export-to-merged-otf',
				position: 'right',
				style: {
					mainColor: currentColor,
				},
			},
			fileStep2: {
				title: 'Unmerged export',
				text: 'Will export your font as is',
				selector: '#export-to-otf',
				position: 'right',
				style: {
					mainColor: currentColor,
				},
			},

			// "collection" steps
			collectionStep1: {
				title: 'Families',
				text: 'A list of the font families you have created',
				selector: '.family-list',
				position: 'right',
				style: {
					mainColor: normalColor,
				},
			},
			collectionStep2: {
				title: 'Variants',
				text: 'Here you can perfom actions on the selected font family and select a variant',
				selector: '.variant-list',
				position: 'right',
				style: {
					mainColor: normalColor,
				},
			},
			collectionStep3: {
				title: 'Variant panel',
				text: 'Here is a list of action you can perfom on the selected variant',
				selector: '.variant-info',
				position: 'left',
				style: {
					mainColor: normalColor,
				},
			},

			// "indiv group create" steps
			indivGroupCreateStep1: {
				title: 'Individualisation Groups',
				text: 'You might want to create individualisation groups because reasons',
				selector: '.create-param-group',
				position: 'right',
				style: {
					mainColor: indivColor,
				},
			},

			// "indiv group edit" steps
			indivGroupEditStep1: {
				title: 'Relative modifications',
				text: 'Toggle this button to make your changes relative to the other glyphs',
				selector: '.indiv-switch-relative',
				position: 'bottom',
				style: {
					mainColor: indivColor,
				},
			},
			indivGroupEditStep2: {
				title: 'Absolute modifications',
				text: 'Toggle this button to make your changes absolute',
				selector: '.indiv-switch-delta',
				position: 'bottom',
				style: {
					mainColor: indivColor,
				},
			},
		};

		// populate steps according to the new tutorial values
		switch (currentState.uiJoyrideTutorialValue) {
			case fileTutorialLabel: {
				// only if this is the first time the user is doing the action
				if (currentState.firstTimeFile) {
					steps.push(
						predefinedSteps.fileStep1,
						predefinedSteps.fileStep2
					);
				}
				break;
			}
			case collectionsTutorialLabel: {
				if (currentState.firstTimeCollection) {
					steps.push(
						predefinedSteps.collectionStep1,
						predefinedSteps.collectionStep2,
						predefinedSteps.collectionStep3
					);
				}
				break;
			}
			case indivGroupsCreationTutorialLabel: {
				if (currentState.firstTimeIndivCreate) {
					steps.push(
						predefinedSteps.indivGroupCreateStep1
					);
				}
				break;
			}
			case indivGroupsEditionTutorialLabel: {
				if (currentState.firstTimeIndivEdit) {
					steps.push(
						predefinedSteps.indivGroupEditStep1,
						predefinedSteps.indivGroupEditStep2
					);
				}
				break;
			}
			default: {
				break;
			}
		}
	}

	return steps;
};

/**
*	procedure that handles "next" step from joyride
*	@param {object} component - "this" of the origin component
*	@param {object} joyrideEvent - the event generated by joyride
*/
const handleNextStep = function(component, joyrideEvent) {
	switch (joyrideEvent.type) {
		case 'finished':
			handleFinished(component);
			break;
		default:
			break;
	}
};

/**
*	procedure that handles "close" step from joyride
*	@param {object} component - "this" of the origin component
*/
const handleClosed = function(component) {
	handleFinished(component);
};

/**
*	procedure that handles "finished" type of "next" step from joyride
*	@param {object} component - "this" of the origin component
*/
function handleFinished(component) {
	switch (component.state.uiJoyrideTutorialValue) {
		case fileTutorialLabel:
			component.client.dispatchAction('/store-value', {firstTimeFile: false});
			break;
		case collectionsTutorialLabel:
			component.client.dispatchAction('/store-value', {firstTimeCollection: false});
			break;
		case indivGroupsCreationTutorialLabel:
			component.client.dispatchAction('/store-value', {firstTimeIndivCreate: false});
			break;
		case indivGroupsEditionTutorialLabel:
			component.client.dispatchAction('/store-value', {firstTimeIndivEdit: false});
			break;
		default:
			break;
	}
}

export {
	// methods
	buildTutorialSteps,
	handleNextStep,
	handleClosed,

	//labels
	fileTutorialLabel,
	collectionsTutorialLabel,
	indivGroupsCreationTutorialLabel,
	indivGroupsEditionTutorialLabel,
};
