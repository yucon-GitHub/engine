<!--
/**
 * @fileName: modal
 * @author: yucon
 * @remark: 模态框
*/
-->
<template>
    <transition name="fade">
        <div :class="{'mask hhh': mask}" v-if="value" @click.self="handleMask">
            <div
                class="left-top-center modal-component radius-4"
                :class="{'modal-border': !mask}">
                <div class="title fz-17 color-main mt-10 mb-10">{{ modalTitle }}</div>
                <slot name="content"></slot>
                <div class="but-group flex flex-end" v-if="showButton">
                    <button class="mr-20" v-if="showCancel" @click.stop="cancel">{{ cancelText }}</button>
                    <button type="primary" v-if="showConfirm" @click.stop="confirm">{{ confirmText }}</button>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'modal',
    props: {
        value: {
            type: Boolean,
            default: false
        },
        // 是否显示遮罩
        mask: {
            type: Boolean,
            default: true
        },
        // 是否显示按钮
        showButton: {
            type: Boolean,
            default: true
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        showCancel: {
            type: Boolean,
            default: true
        },
        confirmText: {
            type: String,
            default: '确认'
        },
        showConfirm: {
            type: Boolean,
            default: true
        },
        modalTitle: String,
        // 是否点击mask 关闭
        maskClick: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'value',
        event: 'input'
    },
    methods: {
        cancel() {
            this.$emit('input', false);
            this.$emit('closeModal');
        },

        confirm() {
            console.log('confirm');
        },

        handleMask() {
            this.$emit('input', !this.maskClick);
        }
    }
};
</script>

<style lang="scss" scoped>
.modal-border {
    border: 1px solid $border;
}
.modal-component {
    width: 80%;
    top: 40%;
    padding: 15px;
    background: $white;
    .title{
        font-weight: bold;
        letter-spacing: 2px;
    }
}

</style>
