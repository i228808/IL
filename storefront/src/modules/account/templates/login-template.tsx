"use client"

import { useState } from "react"

import Register from "@modules/account/components/register"
import Login from "@modules/account/components/login"

export enum LOGIN_VIEW {
  SIGN_IN = "sign-in",
  REGISTER = "register",
}

const LoginTemplate = () => {
  const [currentView, setCurrentView] = useState("sign-in")

  return (
    <div className="w-full flex justify-center px-4 py-20 min-h-[80vh] items-center">
      <div className="glass-card p-10 rounded-xl w-full max-w-md shadow-2xl transition-all duration-500">
        <div className="text-center mb-8">
          <span className="text-brand-secondary uppercase tracking-[0.2em] text-xs font-bold">Welcome Back</span>
        </div>
        {currentView === "sign-in" ? (
          <Login setCurrentView={setCurrentView} />
        ) : (
          <Register setCurrentView={setCurrentView} />
        )}
      </div>
    </div>
  )
}

export default LoginTemplate
