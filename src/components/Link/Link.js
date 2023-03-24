import React, { useEffect, useRef, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import {
  Arrow,
  DecoratedLinkButton,
  DropdownArrow,
  DropdownContainer,
  DropdownLink,
  DropdownMenu,
  LinkButton,
  LinkWithDecoration,
  LinkWithoutDecoration,
} from "./LinkStyles";

const Link = ({
  right,
  to,
  isButton,
  withIcon,
  dropdownLink,
  children,
  linkTxtColor,
  linkBackgroundColor,
  theLink,
  linkHoverColor,
  icon,
  activeLink,
  currentLink,
  onClick,
  isOpen,
  onSelectActiveLink,
  isactive,
  setIsDropdownOpen,
}) => {
  const { pathname } = useLocation();

  const ref = useRef();

  useEffect(() => {
    if (theLink?.to === currentLink?.to) {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [ref, currentLink]);

  if (dropdownLink) {
    return (
      <DropdownContainer>
        <DropdownLink
          onClick={() => {
            if (theLink?.to === currentLink?.to) {
              setIsDropdownOpen(false);
              onClick(null);
            } else {
              onClick(theLink);
            }
          }}
          linkTxtColor={linkTxtColor}
          linkBackgroundColor={linkBackgroundColor}
          isOpen={isOpen}
          isActive={isactive}
        >
          {icon || null}
          {activeLink?.title || theLink?.title}
          <BsChevronDown size={12} />
        </DropdownLink>
        <DropdownMenu isOpen={isOpen} ref={ref} right={right}>
          <div className={"active"}>
            {theLink?.categories?.map((link, index) => (
              <>
                <LinkWithDecoration
                  to={link?.to}
                  key={index}
                  linkTxtColor={linkTxtColor}
                  linkBackgroundColor={linkBackgroundColor}
                  isActive={link?.to?.toLowerCase() === pathname?.toLowerCase()}
                  onClick={() => onSelectActiveLink(link)}
                >
                  {link?.title}
                </LinkWithDecoration>
                {index > 0 && index % 3 === 0 && <span>tst</span>}
              </>
            ))}
          </div>
        </DropdownMenu>
      </DropdownContainer>
    );
  }
  if (isButton) {
    return (
      <LinkButton
        to={theLink?.to}
        linkTxtColor={linkTxtColor}
        linkBackgroundColor={linkBackgroundColor}
        isActive={theLink?.to?.toLowerCase() === pathname?.toLowerCase()}
        onClick={() => {
          onClick(theLink);
          onSelectActiveLink(theLink);
        }}
      >
        {theLink?.title}
      </LinkButton>
    );
  }
  return (
    <LinkWithoutDecoration
      to={theLink?.to}
      linkTxtColor={linkTxtColor}
      linkBackgroundColor={linkBackgroundColor}
      isActive={theLink?.to?.toLowerCase() === pathname?.toLowerCase()}
      onClick={() => {
        onClick(theLink);
        onSelectActiveLink(theLink);
      }}
    >
      {icon || null}
      <span>{theLink?.title}</span>
    </LinkWithoutDecoration>
  );
};

export default Link;
