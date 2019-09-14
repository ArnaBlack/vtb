export default ({app}, inject) => {
    inject('api', {
        project: {
            list: '/api/project/',
            current: '/api/project/current',
            about: projectId => `/api/project/${projectId}/about/`,
            infra: projectId => `/api/project/${projectId}/infra/`,
            pages: projectId => `/api/project/${projectId}/pages/`,
            first_block: projectId => `/api/project/${projectId}/first/`,
            gallery: projectId => `/api/project/${projectId}/gallery/`,
            office: projectId => `/api/project/${projectId}/office/`,
            environment: projectId => `/api/project/${projectId}/environment/`,
            posts: projectId => `/api/project/${projectId}/posts/`,
            layouts: projectId => `/api/project/${projectId}/layouts/`,
            retailParking: projectId => `/api/project/${projectId}/nonresidential/`,
            special: projectId => `/api/project/${projectId}/special_offers_links/`
        },
        flats: {
            list: '/api/flat/',
            favorites: '/api/flat/favorites/',
            specs: '/api/flat/specs/',
            facets: '/api/flat/facets/',
            similar: flatId => `/api/flat/${flatId}/similar/`
        },
        layouts: {
            list: '/api/layout/',
            detail: slug => `/api/layout/${slug}/`
        },
        visual: {
            building: '/api/building/',
            section: '/api/section/'
        },
        news: {
            base: '/api/post/',
            specs: '/api/post/specs/',
            detail: slug => `/api/post/${slug}/`
        },
        promo: {
            base: '/api/promo/',
            detail: slug => `/api/promo/${slug}/`
        },
        favourites: {
            add: id => `/api/favorites/${id}/add/`,
            remove: id => `/api/favorites/${id}/remove/`
        },
        documents: '/api/document/',
        interiors: '/api/interior_gallery/',
        office: '/api/office/',
        mortgage: {
            page: '/api/mortgage/',
            offers: '/api/mortgage-offer/',
            specs: '/api/mortgage-offer/specs/'
        },
        installment: {
            page: '/api/installment/'
        },
        request: '/api/request/',
        progress: {
            list: '/api/progress/',
            years: '/api/progress/years/'
        }
    });
};
