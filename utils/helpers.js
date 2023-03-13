module.exports = {
    randomVerticalPhoto: () => {
        // images array
        const verticalPhotos = [
            '2019 - Krisztina Papp (Unsplash).jpg',
            '2020 - Annie Spratt (Unsplash).jpg',
            '2020 - Kateryna Hliznitsova (Unsplash).jpg',
            '2020 - Kin Li (Unsplash).jpg',
            '2021 - Elena Popova (Unsplash).jpg',
            '2021 - Taisiia Shestopal (Unsplash).jpg',
            '2021 #1 - Mariah Hewines (Unsplash).jpg',
            '2021 #2 - Mariah Hewines (Unsplash).jpg',
            'Chestnut Brown Ruled Notebook on Picnic Blanket in Summer, Cheese, Wine, Orange, Beechmore Books (Unsplash).jpg',
            'First day of summer - Svetlana Kuznetsova (Unsplash).jpg',
            'French picnic setup - Calvin Shelwell (Unsplash).jpg',
            'Kateryna Hliznitsova (Unsplash).jpg',
            'New Farm Park, 新農場 昆士蘭州澳洲 - Jojo Yuen sharemyfoodd (Unsplash).jpg',
            'Pallet table with food and place settings - Mariah Hewines (Unsplash).jpg',
            'Picnic in the park ☀️🤍 - Priyanka Aggarwal (Unsplash).jpg',
            'Picnic on the beach - Sixteen Miles Out (Unsplash).jpg',
            'Royal Botanical Garden Edinburgh, Edinburgh, United Kingdom - Maria Ilves (Unsplash).jpg'
        ];
        // random index number
        const random = Math.floor(Math.random() * verticalPhotos.length);
        return verticalPhotos[random];
    }
}