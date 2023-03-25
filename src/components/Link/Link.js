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
  isButton,
  dropdownLink,
  linkTxtColor,
  linkBackgroundColor,
  theLink,
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
          data-testid="dropdown-link"
          open={isOpen}
          actived={isactive}
        >
          {icon || null}
          {activeLink?.title || theLink?.title}
          <BsChevronDown size={12} />
        </DropdownLink>
        <DropdownMenu open={isOpen} ref={ref} right={right}>
          <div>
            {theLink?.categories?.map((link, index) => (
              <>
                <LinkWithDecoration
                  to={link?.to}
                  key={index}
                  actived={
                    link?.to?.toLowerCase() === pathname?.toLowerCase() ? 1 : 0
                  }
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
        actived={theLink?.to?.toLowerCase() === pathname?.toLowerCase() ? 1 : 0}
        onClick={() => {
          onClick(theLink);
          onSelectActiveLink(theLink);
        }}
        data-testid="button-link"
      >
        {theLink?.title}
      </LinkButton>
    );
  }
  return (
    <LinkWithoutDecoration
      to={theLink?.to}
      actived={theLink?.to?.toLowerCase() === pathname?.toLowerCase() ? 1 : 0}
      onClick={() => {
        onClick(theLink);
        onSelectActiveLink(theLink);
      }}
      data-testid="normal-link"
    >
      {icon || null}
      <span>{theLink?.title}</span>
    </LinkWithoutDecoration>
  );
};

export default Link;
