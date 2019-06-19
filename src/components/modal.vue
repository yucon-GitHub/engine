<!--
/**
 * @fileName: modal
 * @author: yucon
 * @remark: 模态框
*/
-->
<template>
    <div :class="{'mask': mask}" v-if="modalFlag">
        <div
            class="left-top-center modal-component radius-4"
            :class="{'modal-border': !mask}">

            <div class="title fz-17 color-main mt-10 mb-10">{{ modalTitle }}</div>

            <slot name="content"></slot>

            <div class="but-group flex flex-end" v-if="showButton">
                <button class="mr-20" v-if="showCancel" @click="cancel">{{ cancelText }}</button>
                <button type="primary" v-if="showConfirm" @click="confirm">{{ confirmText }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal',
    props: {
        modalFlag: Boolean,
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
        modalTitle: String
    },
    methods: {
        cancel () {
            this.modalFlag = false
            this.$emit('closeModal')
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-border {
    border: 1px solid $border;
}
.modal-component {
    width: 60%;
    top: 40%;
    padding: 15px;
    background: $white;
    .title{
        font-weight: bold;
        letter-spacing: 2px;
    }
}

</style>
