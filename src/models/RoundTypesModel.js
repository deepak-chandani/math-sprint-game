const roundTypes = [
    {
        id: 1,
        text: "10 Questions",
        questionCount: 10,
    },
    {
        id: 2,
        text: "20 Questions",
        questionCount: 20,
    },
    {
        id: 3,
        text: "25 Questions",
        questionCount: 25,
    },
    {
        id: 4,
        text: "35 Questions",
        questionCount: 35,
    },
]


function getAll() {
    return roundTypes;
}

function findById(id) {
    return roundTypes.find(item => item.id === id);
}

export default {getAll, findById}