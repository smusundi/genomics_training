
const questions = [
  {
    title: 'Initial outbreak notification',
    briefing: `Early 2024 · Coastal Kenya

Several individuals presenting with redness of the eyes have been reported at health facilities over a short period. The number of cases appears to be increasing, and members of the public are becoming increasingly concerned about how the illness is spreading.

As a public health official, you receive notification of this event.`,
    question: 'What is the first thing you should do?',
    options: [
      {
        id: 'A',
        text: 'Immediately declare a large-scale outbreak and recommend treatment for the entire community.'
      },
      {
        id: 'B',
        text: 'Verify the reported cases by visiting the health facilities, reviewing patient records and conducting preliminary investigations.'
      },
      {
        id: 'C',
        text: 'Immediately collect samples and send them for whole-genome sequencing.'
      },
      {
        id: 'D',
        text: 'Issue a public announcement identifying the disease before conducting an investigation.'
      }
    ],
    correct: 'B',
    explanation: 'The first step is to verify the notification and establish whether the reported cases represent an unusual increase. Visit the affected health facilities, review clinical records, interview healthcare workers and begin preliminary case finding. A working case definition can then guide the investigation.'
  },

  {
    title: 'Case investigation and specimen collection',
    briefing: `Following your initial visit, you confirm that several patients have similar clinical presentations. You begin collecting epidemiological information, including their symptoms, date of onset, age, residence and possible contact with other affected individuals.

    You now need to investigate the possible cause of the illness and collect appropriate clinical specimens.`,
    question: 'Which specimen would be most appropriate to collect from patients for laboratory investigation?',
    options: [
      {
        id: 'A',
        text: 'Blood samples only, to investigate possible bloodstream infections.'
      },
      {
        id: 'B',
        text: 'Conjunctival swabs from affected eyes for bacterial and viral investigations.'
      },
      {
        id: 'C',
        text: 'Stool samples only, without collecting specimens from the affected eyes.'
      },
      {
        id: 'D',
        text: 'Sputum samples from all affected individuals.'
      }
    ],
    correct: 'B',
    explanation: 'Conjunctival swabs are appropriate specimens for investigating infections affecting the eye. They can be used for bacterial culture and molecular testing for suspected viral pathogens. Additional specimens may be considered depending on the clinical and epidemiological findings.'
  },

  {
    title: 'Initial laboratory investigation',
    briefing: `The clinical specimens have been received at the laboratory. The cause of the illness is still unknown.

    You need to begin with laboratory investigations that can help identify common bacterial and viral causes before considering broader pathogen discovery approaches.`,
    question: 'Which initial laboratory investigations would you prioritise?',
    options: [
      {
        id: 'A',
        text: 'Bacterial culture and pan-adenovirus PCR testing.'
      },
      {
        id: 'B',
        text: 'Whole-genome sequencing of all samples without preliminary testing.'
      },
      {
        id: 'C',
        text: 'Antibody testing for all known viral infections.'
      },
      {
        id: 'D',
        text: 'Antimicrobial susceptibility testing without first attempting to isolate bacteria.'
      }
    ],
    correct: 'A',
    explanation: 'Bacterial culture can investigate possible bacterial causes, while pan-adenovirus PCR can screen for adenovirus, an important cause of eye infections. If routine investigations do not identify the cause, broader approaches such as metagenomic sequencing can be considered for pathogen discovery.'
  }
]
