import { v4 as uuidv4 } from 'uuid';

export const initialState = {
    generalInfo: {
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        phone: '(555) 123-4567',
        address: 'New York, NY',
        linkedin: 'linkedin.com/in/johndoe',
        website: 'johndoe.com',
    },
    education: [
        {
            id: uuidv4(),
            school: 'Harvard University',
            degree: 'Bachelor of Science in Computer Science',
            location: 'Cambridge, MA',
            dates: 'Aug 2018 - May 2022',
            description: 'Graduated with Honors. GPA: 3.9/4.0',
        },
    ],
    experience: [
        {
            id: uuidv4(),
            company: 'Tech Solutions Inc.',
            role: 'Software Engineer',
            location: 'San Francisco, CA',
            dates: 'Jun 2022 - Present',
            description: 'Developed scalable web applications using React and Node.js. Improved system performance by 20%.',
        },
    ],
    skills: [
        { id: uuidv4(), category: 'Languages', items: 'JavaScript, TypeScript, Python, Java' },
        { id: uuidv4(), category: 'Frameworks', items: 'React, Next.js, Node.js, Express' },
        { id: uuidv4(), category: 'Tools', items: 'Git, Docker, AWS, Firebase' },
    ],
    languages: [
        { id: uuidv4(), language: 'English', level: 'Native' },
        { id: uuidv4(), language: 'Spanish', level: 'Native' },
    ],
    courses: [
        {
            id: uuidv4(),
            name: 'Full Stack Development',
            organization: 'Udemy',
            date: '2023',
        },
    ],
    settings: {
        margins: 2.5, // in cm
        headerColor: '#000000',
        headerStyle: 'center', // center, left
        fontSize: 'sm', // xs, sm, base
    },
};

export const cvReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_GENERAL_INFO':
            return {
                ...state,
                generalInfo: { ...state.generalInfo, ...action.payload },
            };
        case 'UPDATE_SETTINGS':
            return {
                ...state,
                settings: { ...state.settings, ...action.payload },
            };
        case 'ADD_ITEM':
            return {
                ...state,
                [action.payload.section]: [
                    ...state[action.payload.section],
                    { ...action.payload.item, id: uuidv4() },
                ],
            };
        case 'UPDATE_ITEM':
            return {
                ...state,
                [action.payload.section]: state[action.payload.section].map((item) =>
                    item.id === action.payload.id ? { ...item, ...action.payload.item } : item
                ),
            };
        case 'DELETE_ITEM':
            return {
                ...state,
                [action.payload.section]: state[action.payload.section].filter(
                    (item) => item.id !== action.payload.id
                ),
            };
        default:
            return state;
    }
};
