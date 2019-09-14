<template>
    <div :class="[$style.wrap, 'page']">
        <div class="wrapper">
            <div class="container">
                <div :class="$style.image"></div>

                <div :class="$style.title">
                    Страница не найдена
                </div>

                <div :class="$style.subtitle">
                    А вы знали, что наша главная обновляется каждые 30 секунд?
                    <nuxt-link :class="$style._link"
                               class="brown-link"
                               to="/">
                        Проверьте сами
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            error: {
                type: Object
            }
        },

        layout() {
            return 'stellar';
        },
    };
</script>

<style lang="scss" module>
    .wrap {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .image {
        flex-grow: 1;
        width: 100%;
        max-height: 500rem;
        margin-bottom: 4.8rem;
        background-size: contain;
    }

    .title {
        flex-shrink: 0;
        font-size: 2rem;
        font-weight: 300;
        text-align: center;
    }

    .subtitle {
        flex-shrink: 0;
        margin-top: 1.6rem;
        font-size: 1.6rem;
        font-weight: 300;
        text-align: center;
    }

    .link {
        font-weight: normal;
    }
</style>
