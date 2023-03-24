import React, { useEffect, useRef, useState } from "react";
import Link from "../Link/Link";
import { useLocation } from "react-router-dom";
import {
  NavContainer,
  Logo,
  Links,
  Hamburger,
  Overlay,
  Drawer,
  HeaderContainer,
  DrawerContainer,
  TopNavContainer,
  NavRight,
} from "./styles";
import Nav from "../Nav/Nav";

const Navigation = ({ top_links, bgColor, responsiveBtnColor }) => {
  const [open, setOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState(null);
  const [activeLink, setActiveLink] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { pathname } = useLocation();
  const toggle = () => setOpen(!open);

  const onSelectCurrent = (currentLink) => {
    setCurrentLink(currentLink);
    setIsDropdownOpen(true);
  };
  const onSelectActiveLink = (link) => {
    setActiveLink(link);
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (
      !activeLink &&
      !currentLink &&
      top_links.some(
        (link) => link?.to?.toLowerCase() != pathname?.toLowerCase()
      )
    ) {
      for (var i = 0; i < top_links?.length; i++) {
        if (top_links[i]?.type != "isDropdown") {
          setActiveLink(top_links[i]);
          setCurrentLink(top_links[i]);
          break;
        }
      }
    }
  }, []);

  return (
    <HeaderContainer open={open}>
      <TopNavContainer>
        <NavContainer bgColor={bgColor}>
          <Logo>Nemeton</Logo>
          <Links>
            {top_links?.map((link, index) => {
              link = { ...link, index: index };
              return link?.type === "isDropdown" ? (
                <Link
                  dropdownLink={true}
                  to={link?.to}
                  key={index}
                  onClick={onSelectCurrent}
                  currentLink={currentLink}
                  isOpen={
                    isDropdownOpen &&
                    currentLink?.to.toLowerCase() === link?.to?.toLowerCase()
                  }
                  onSelectActiveLink={onSelectActiveLink}
                  theLink={link}
                  activeLink={
                    activeLink &&
                    link?.categories?.some(
                      (category) =>
                        category?.to?.toLowerCase() ===
                        activeLink?.to?.toLowerCase()
                    )
                      ? activeLink
                      : link
                  }
                  isactive={
                    activeLink &&
                    link?.categories?.some(
                      (category) =>
                        category?.to?.toLowerCase() ===
                          activeLink?.to?.toLowerCase() &&
                        category?.to?.toLowerCase() === pathname?.toLowerCase()
                    )
                  }
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              ) : link?.type === "isButton" ? (
                <Link
                  key={index}
                  theLink={link}
                  to={link?.to}
                  currentLink={link}
                  isButton
                  onSelectActiveLink={onSelectActiveLink}
                  activeLink={activeLink}
                  onClick={() => onSelectCurrent(link)}
                />
              ) : link?.type === "withIcon" ? (
                <Link
                  key={index}
                  theLink={link}
                  to={link?.to}
                  currentLink={link}
                  onSelectActiveLink={onSelectActiveLink}
                  activeLink={activeLink}
                  onClick={() => onSelectCurrent(link)}
                  withIcon
                />
              ) : (
                <Link
                  key={index}
                  theLink={link}
                  to={link?.to}
                  currentLink={link}
                  onSelectActiveLink={onSelectActiveLink}
                  activeLink={activeLink}
                  onClick={() => onSelectCurrent(link)}
                />
              );
            })}
          </Links>
          <Hamburger
            onClick={toggle}
            open={open}
            responsiveBtnColor={responsiveBtnColor}
          >
            <span></span>
            <span></span>
            <span></span>
          </Hamburger>
        </NavContainer>
        <NavRight>
          <Links>
            {activeLink?.menu_right?.map((link, index) => {
              link = { ...link, index: index };
              return link?.type === "isDropdown" ? (
                <Link
                  right
                  dropdownLink={true}
                  to={link?.to}
                  icon={link?.icon}
                  key={index}
                  onClick={onSelectCurrent}
                  currentLink={currentLink}
                  isOpen={
                    isDropdownOpen &&
                    currentLink?.to.toLowerCase() === link?.to?.toLowerCase()
                  }
                  onSelectActiveLink={onSelectActiveLink}
                  theLink={link}
                  activeLink={
                    activeLink &&
                    link?.categories?.some(
                      (category) =>
                        category?.to?.toLowerCase() ===
                        activeLink?.to?.toLowerCase()
                    )
                      ? activeLink
                      : link
                  }
                  isactive={
                    activeLink &&
                    link?.categories?.some(
                      (category) =>
                        category?.to?.toLowerCase() ===
                          activeLink?.to?.toLowerCase() &&
                        category?.to?.toLowerCase() === pathname?.toLowerCase()
                    )
                  }
                  setIsDropdownOpen={setIsDropdownOpen}
                />
              ) : link?.type === "isButton" ? (
                <Link
                  key={index}
                  theLink={link}
                  to={link?.to}
                  icon={link?.icon}
                  currentLink={link}
                  isButton
                  onSelectActiveLink={onSelectActiveLink}
                  activeLink={activeLink}
                  onClick={() => onSelectCurrent(link)}
                />
              ) : link?.type === "withIcon" ? (
                <Link
                  key={index}
                  theLink={link}
                  to={link?.to}
                  currentLink={link}
                  onSelectActiveLink={onSelectActiveLink}
                  activeLink={activeLink}
                  onClick={() => onSelectCurrent(link)}
                  withIcon
                />
              ) : (
                <Link
                  key={index}
                  theLink={link}
                  icon={link?.icon}
                  to={link?.to}
                  currentLink={link}
                  onSelectActiveLink={onSelectActiveLink}
                  activeLink={activeLink}
                  onClick={() => onSelectCurrent(link)}
                />
              );
            })}
          </Links>
        </NavRight>
      </TopNavContainer>
      <Nav menu_links={activeLink?.menu_links} />
      {open && (
        <DrawerContainer open={open}>
          <Overlay open={open} onClick={toggle} />
          <Drawer open={open} bgColor={bgColor}>
            test
          </Drawer>
        </DrawerContainer>
      )}
    </HeaderContainer>
  );
};

export default Navigation;
