import React, { useState } from 'react'
import { HiUserCircle } from 'react-icons/hi';
import {AiOutlineLock} from 'react-icons/ai';
import { AiOutlineLoading } from 'react-icons/ai';
import request from '../utils/request';
import { Input, Button, Space } from 'antd';
import heroBg from '../assets/hero.png'
import {storeUser} from '../utils/storage';
import { message } from 'antd'

// 登录页面
const Sign = () => {
    const [loginType, setType] = useState(0);
    const [loading, setLoading] = useState(false);
    const labelList = []
    const [info,setInfo] = useState({
        nickname: '',
        username: '',
        password: '',
        gameLabel: ''
    })

    const handleChange = (e) => {
        setInfo(prev => ({...prev,[e.target.name]: e.target.value}));
    }

    // 用户注册
    const handleSignUp = () => {
        if(!info.nickname || !info.username || !info.password) {
            message.error('username or password is null')
            return
        }
        setLoading(true)
        request('user.register',{
            data: JSON.stringify(info),
        }).then(res => {
            if(res.success) {
                message.success('register successfully')
            }
            setLoading(false)
        }).catch(e => setLoading(false))
    }

    // 用户登录
    const handleSignIn = () => {
        if(!info.username || !info.password) {
            message.error('form cannot be null')
            return
        }
        setLoading(true)
        request('user.login',{
            data: JSON.stringify(info)
        }).then(res => {
            if(res.success) {
                if(res.success) {
                    message.success('welcome to GAME ONL')
                }
                storeUser(res.data);
                window.location.href = "/"
            }
            setLoading(false)
        }).catch(e => setLoading(false))
    }
    return (
        <div className="flex relative w-[100vw] h-[100vh] justify-around items-center">
            <img className="absolute left-0 top-0 h-[100%] w-[100%]" src={heroBg} alt="" />
            <div className="bg-[rgba(0,0,0,0.5)] z-10 shadow-xl flex py-[50px] items-center px-[60px]">
                <div className="font-bold text-white dark:text-white min-w-[350px]">
                <div className="font-bold mb-[20px] text-2xl mr-[15px]">GAM<span className="text-orange-500">E</span> online</div>
                    <div className="tabs flex cursor-pointer">
                        <div onClick={() => setType(0)} className={`${loginType == 0 && 'border-b-2'} h-[30px] leading-[30px] mr-[20px]`}>Login</div>
                        <div onClick={() => setType(1)} className={`${loginType == 1 && 'border-b-2'} h-[30px] leading-[30px]`}>Register</div>
                    </div>
                    { loginType == 0 && <div className="mt-[20px]">
                        <Input size="large" value={info.username} onChange={handleChange} placeholder="username" name="username" prefix={<HiUserCircle color="gray" />} />
                        <br />
                        <br />
                        <Input size="large" value={info.password} onChange={handleChange} type="password" placeholder="password" name="password" prefix={<AiOutlineLock color="gray" />} />
                        <br /> <br />
                        <div className="flex justify-between mb-[15px]">
                            <span>forget password</span>
                            <span>change password</span>
                        </div>
                        <Button block type="primary" loading={loading} prefix={<AiOutlineLoading />} onClick={handleSignIn}>
                            LOG IN
                        </Button>
                    </div> }
                    { loginType == 1 && <div className="mt-[20px]">
                        <Input size="large" value={info.nickname} onChange={handleChange} placeholder="nickname" name="nickname" prefix={<HiUserCircle color="gray" />} />
                        <br />
                        <br />
                        <Input size="large" value={info.username} onChange={handleChange} placeholder="username" name="username" prefix={<AiOutlineLock color="gray" />} />
                        <br />
                        <br />
                        <Input size="large" value={info.password} onChange={handleChange} type="password" placeholder="password" name="password" prefix={<AiOutlineLock color="gray" />} />
                        <br /> <br />
                        <Button block type="primary" loading={loading} prefix={<AiOutlineLoading />} onClick={handleSignUp}>
                            REGISTER
                        </Button>
                    </div> }
                </div>
                {/* <div className="ecode min-w-[300px]">

                </div> */}
            </div>
        </div>
    )
}

export default Sign