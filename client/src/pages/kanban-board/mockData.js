import { randomNumber } from "../../utils"

export const BOARD_DATA = [
    {
        id: randomNumber(),
        title: 'Ready',
        tasks: [
            {
                id: randomNumber(),
                title: 'Konsep hero title yang menarik',
                created_at: 'Nov 24',
                comments: 2,
                tags: ['Illustration', 'Copyright']
            },
            {
                id: randomNumber(),
                title: 'Test task',
                created_at: 'Nov 20',
                comments: 2,
                tags: ['Illustration']
            }
        ]
    },
    {
        id: randomNumber(),
        title: 'In Progress',
        tasks: [
            {
                id: randomNumber(),
                title: 'Konsep hero title yang menarik',
                created_at: 'Nov 23',
                comments: 5,
                tags: ['Copyright']
            }
        ]
    },
    {
        id: randomNumber(),
        title: 'Validation',
        tasks: [
            {
                id: randomNumber(),
                title: 'Konsep hero title yang menarik',
                created_at: 'Nov 23',
                comments: 5,
                tags: ['Copyright']
            }
        ]
    },
    {
        id: randomNumber(),
        title: 'Completed',
        tasks: [
            {
                id: randomNumber(),
                title: 'Konsep hero title yang menarik',
                created_at: 'Nov 23',
                comments: 5,
                tags: ['Copyright']
            }
        ]
    }
]