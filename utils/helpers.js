module.exports = {
    password_length: () => {

    },
    // formats date for handlebars views
    format_time: (date) => {
        const timestamp = new Intl.DateTimeFormat("en", {
            timeStyle: "short",
            dateStyle: "medium"
        }).format(date);
        return timestamp;
    },
    // randomly selects vertical image from provided list
    verticalPhoto: () => {
        const verticalPhotos = [
            '2019 - Krisztina Papp (Unsplash).jpg',
            '2020 - Annie Spratt (Unsplash).jpg',
            '2020 - Kateryna Hliznitsova (Unsplash).jpg',
            '2021 - Elena Popova (Unsplash).jpg',
            '2021 - Taisiia Shestopal (Unsplash).jpg',
            '2021 1 - Mariah Hewines (Unsplash).jpg',
            '2021 2 - Mariah Hewines (Unsplash).jpg',
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
    },
    // randomly selects horizontal image from provided list
    horizontalPhoto: () => {
        const horizontalPhotos = [
            '2019 - Ben Moreland (Unsplash).jpg',
            '2019 - Jonathan Borba (Unsplash).jpg',
            '2020 - Deval Parikh (Unsplash).jpg',
            '2020 - Evangelina Silina (Unsplash).jpg',
            'Kateryna Hliznitsova 2 (Unsplash).jpg',
            'Picnic in the garden - sq lim (Unsplash).jpg',
            'Portezuelo Park, Ahuachapán, El Salvador - Jennie Clavel (Unsplash).jpg',
            'Redwood Forest, East Warburton, Australia - britt gaiser (Unsplash).jpg',
            'S\'well Drink Chiller  1 - S\'well (Unsplash).jpg',
            'S\'well Drink Chiller  2 - S\'well (Unsplash).jpg',
            'The peace of an outside breakfast - Massimo Adami (Unsplash).jpg',
            'We just had flower class with cote a cote fleur. And having wonderful brunch - Lee Myungseong (Unsplash).jpg'
        ];
        // random index number
        const random = Math.floor(Math.random() * horizontalPhotos.length);
        return horizontalPhotos[random];
    }
}