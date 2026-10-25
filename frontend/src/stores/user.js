import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useLoginStore = defineStore('loginUser', () => {
    const loginUser = ref({
        userName: '未登录'
    })

    const isLogin = computed(() => !!loginUser.value.id)

    async function fetchLoginUser() {
        const token = localStorage.getItem('token')
        if (!token) return
        try {
            const res = await axios.get('http://localhost:3000/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            })
            loginUser.value = res.data.user
        } catch (e) {
            localStorage.removeItem('token')
        }
    }

    function setLoginUser(newUser) {
        loginUser.value = newUser
        if (newUser.id) {
            localStorage.setItem('token', newUser.token || '')
        } else {
            localStorage.removeItem('token')
        }
    }

    function clearLoginUser() {
        loginUser.value = { userName: '未登录' }
        localStorage.removeItem('token')
    }

    return {
        loginUser,
        isLogin,
        fetchLoginUser,
        setLoginUser,
        clearLoginUser
    }
})