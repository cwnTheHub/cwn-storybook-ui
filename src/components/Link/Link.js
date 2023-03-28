import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { useLocation } from "react-router-dom";
import {
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
  theLink,
  icon,
  activeLink,
  onClick,
  onSelectActiveLink,
  isactive,
}) => {
  const { pathname } = useLocation();
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);

  const handleClickOnDropdown = (ev) => {
    ev.preventDefault();
    setIsDropdownClicked(!isDropdownClicked);
  };

  const handleBlurOnDropdown = (ev) => {
    ev.preventDefault();
    setIsDropdownClicked(!isDropdownClicked);
  };

  if (dropdownLink) {
    return (
      <DropdownContainer data-testid="dropdown-container">
        <DropdownLink
          onClick={handleClickOnDropdown}
          data-testid="dropdown-link"
          open={isDropdownClicked}
          actived={isactive}
        >
          {icon || null}
          {activeLink?.title || theLink?.title}
          <BsChevronDown size={12} />
        </DropdownLink>
        {isDropdownClicked && (
          <DropdownMenu
            open={isDropdownClicked}
            right={right}
            data-testid="dropdown-menu"
            tabindex="0"
            onBlur={handleBlurOnDropdown}
          >
            {theLink?.categories?.map((link, index) => (
              <div key={index}>
                <LinkWithDecoration
                  to={link?.to}
                  actived={
                    link?.to?.toLowerCase() === pathname?.toLowerCase() ? 1 : 0
                  }
                  onClick={() => onSelectActiveLink(link)}
                >
                  {link?.title}
                </LinkWithDecoration>
                {index > 0 && index % 3 === 0 && <span>tst</span>}
              </div>
            ))}
          </DropdownMenu>
        )}
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
