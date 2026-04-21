import React, { useState } from 'react'
import { Link as RouterLink } from "react-router-dom";
import {
  Navbar as NavbarComponent,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";


import { IoMdSearch } from "react-icons/io";
import {getUserData} from "@/components/shared/Userdata";
import { Link } from 'react-router-dom';
import { FaThList } from "react-icons/fa";
import CreatProject from '../ui/CreatProject';
import PillNav from '../PillNav';


export default function Navebar({ activePath = "/" }) {

  const { email, fullName } = getUserData();

const [isDark, setIsDark] = useState(
  document.documentElement.classList.contains("dark")
);
 function toggleDarkMode() {
  document.documentElement.classList.toggle("dark");

  setIsDark(
    document.documentElement.classList.contains("dark")
  );
}
  function logout(){
    localStorage.removeItem("userData");
    window.location.href = "/auth"; // Simple redirect
  }


  const navItems = [ // ✅ Define nav items once
    { label: "Projects", href: "/" },
    { label: "Board", href: "/board" },
    { label: "Analysis", href: "/analysis" },
  ];
  return (
    <>
        <NavbarComponent isBordered className='
        fixed top-0 left-0 w-full z-50 rounded-b-xl
         p-3 gap-4 shadow-xl dark:bg-gray-800 bg-white/30
         backdrop-blur-md border-gray-200/50 dark:border-gray-700/50'>
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4 flex items-center gap-2">
        <div className="rounded-full p-1.5 text-white text-[16px] font-bold bg-gradient-to-br from-blue-500 to-green-500">
          PH
        </div>
        <p className="text-black text-[20px] font-bold dark:text-white" >Project Hive</p>

        </NavbarBrand>

   
      </NavbarContent>

    <NavbarContent justify="center" className="hidden md:flex">
        <NavbarItem className="mx-auto">
          <PillNav
            items={navItems}
            activeHref={activePath}
          />
        </NavbarItem>
      </NavbarContent>

        
      <NavbarContent className="items-center" justify="end">
            <NavbarItem className="md:hidden ">
          <Dropdown placement="bottom-center">
          <DropdownTrigger>
            <Button 
              className="p-2 rounded-lg shadow-lg text-gray-600 hover:bg-gray-200/50 hover:text-gray-800 dark:hover:bg-gray-700/50 dark:text-white transition-colors" 
              variant="light"
              color="default"
              isIconOnly
            >
            <FaThList size={20} />
            </Button>
          </DropdownTrigger>
          <DropdownMenu 
            className='w-56 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-xl border border-gray-200/50 dark:border-gray-700/50'
          >
            {navItems.map((item) => (
              <DropdownItem 
                key={item.href}
                as={RouterLink}
                to={item.href}
                className="py-3 text-black   px-4 text-lg font-medium hover:bg-blue-500 hover:text-white dark:hover:bg-blue-700/50 dark:text-white transition-colors rounded-lg"
              >
                {item.label}
              </DropdownItem> 

            ))}
                    <DropdownItem>
          <button onClick={toggleDarkMode} type="button" 
          class="border font-bold hs-dark-mode-active:hidden block hs-dark-mode font-medium text-foreground rounded-full hover:bg-surface-hover focus:outline-hidden focus:bg-surface-focus" data-hs-theme-click-value="dark">
  <span class="group inline-flex shrink-0 justify-center items-center size-9">
    <svg class="shrink-0  hidden dark:block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
     <svg class="shrink-0 dark:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
  </span>
</button>
        </DropdownItem>
          </DropdownMenu>
          </Dropdown>
        </NavbarItem>
          <NavbarItem>
          <CreatProject/>
          </NavbarItem>
      
          
        <NavbarItem className='hidden md:flex'>
          <button onClick={toggleDarkMode} type="button" 
          class="border font-bold hs-dark-mode-active:hidden block hs-dark-mode font-medium text-foreground rounded-full hover:bg-surface-hover focus:outline-hidden focus:bg-surface-focus" data-hs-theme-click-value="dark">
  <span class="group inline-flex shrink-0 justify-center items-center size-9">
    <svg class="shrink-0  hidden dark:block size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
     <svg class="shrink-0 dark:hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
  </span>
</button>
        </NavbarItem>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              src="public/imag/296fe121-5dfa-43f4-98b5-db50019738a7.jpg"
            />
          </DropdownTrigger>
          <DropdownMenu
          className='bg-gray-100 gap-3 rounded-lg p-2 shadow-lg dark:bg-gray-700/50 backdrop-blur-md'
          aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2"> 
              <p>{ fullName }</p>
              <p className="font-semibold">{ email }</p>
            </DropdownItem>
    <DropdownItem
  key="logout"
  textValue="Logout"
  className="h-14 gap-2
  text-red-600 hover:bg-red-100/50 hover:text-red-700 transition-colors"
  onClick={logout}
  as={Link}
  to="/auth"
>
logout
</DropdownItem>
        </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NavbarComponent>
    </>
  )
}
export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};














