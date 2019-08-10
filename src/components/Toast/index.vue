<template>
    <div id="Toast" :class="{'fade-out' : fadeOutClass}">
        <div :class="{'mask' : mask, 'ToastMask' : type !== 'alert' && mask}">

            <!--  toast container -->
            <section class="toast-title left-top-center text-center" v-if="type !== 'alert'">
                <div class="loading-boll" v-if="type === 'loading'"></div>
                <div class="toast-icon" v-else-if="['success', 'error'].includes(type)">
                    <img :src="iconPath" alt="" />
                </div>
                <div>{{ title }}</div>
            </section>

            <!-- alert container  -->
            <section v-if="type === 'alert'" class="alert left-top-center">
                <div class="content">
                    {{title}}
                    <div class="text">{{content}}</div>
                </div>
                <div class="flex btn-group flex-center">
                    <button @click="cancel" class="flex-1">取消</button>
                    <button @click="confirm" class="flex-1">确认</button>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    name: 'toast',

    data() {
        return {
            type: '',
            title: '',
            duration: 1500,
            fadeOutClass: false,
            mask: false,
            content: ''
        };
    },

    created() {
        if (this.type !== 'loading') this.fadeOut();
    },

    computed: {
        iconPath() {
            return this.type === 'success' ? require('../../static/img/success_icon.png') : require('../../static/img/error_icon.png');
        }
    },

    methods: {
        // 淡出动画
        fadeOut() {
            setTimeout(() => {
                this.fadeOutClass = true;
            }, this.duration - 200);
        },

        confirm() {
            this.onConfirm && this.onConfirm('confirm');
        },
        cancel() {
            this.onCancel && this.onCancel('cancel');
            document.body.removeChild(this.$el);
        }
    }
}
</script>

<style scoped lang="scss">
    .ToastMask { background: none; }

    .fade-out {
        .toast-title {
            animation: fadeOut .2s ease forwards;
            @keyframes fadeOut {
                from {
                    transform: translate(-50%, -50%);
                    opacity: 1;
                }
                to {
                    transform: translate(-50%, -20%);
                    opacity: 0;
                }
            }
        }
    }

    .toast-title {
        background-color: rgba($black, .9);
        padding: 10px 30px;
        border-radius: 4px;
        color: $white;
        animation: fadeIn .3s ease;
        @keyframes fadeIn {
            from {
                transform: translate(-50%, -25%);
                opacity: .2;
            }
            to {
                transform: translate(-50%, -50%);
                opacity: 1;
            }
        }
    }

    .loading-boll {
        width: 25px;
        height: 25px;
        border-style: dashed;
        border-color: $white;
        border-width: 3px;
        margin: 10px auto;
        border-radius: 50%;
        background: $warning;
        box-shadow: 0 0 3px 3px $white, 0 0 1px 1px $black inset ;
        animation: loadingRota 1s linear infinite;
        @keyframes loadingRota {
            to { transform: rotate(360deg); }
        }
    }
    .toast-icon {
        img {
            width: 50px;
        }
    }

    .alert {
        width: 70%;
        background: $white;
        border-radius: 4px;

        .content {
            padding: 20px 30px;
        }
        .btn-group {
            border-top: 1px solid $border;
            button:first-child {
                border-right: 1px solid $border;
            }
            button {
                border: none;
                font-size: 16px;
                padding: 10px 0;
                border-radius: 0;
            }
        }
    }
</style>
