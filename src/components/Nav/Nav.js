import React, { useEffect, useRef, useState } from "react";
import Link from "../Link/Link";
import {
  ChildrenContent,
  ChildrenNavContainer,
  Links,
  LogoSection,
} from "./styles";

const Nav = ({ menu_links, bgColor }) => {
  const [childrenIsActive, setChildrenIsActive] = useState(false);
  const [activeChildLink] = useState("");

  const toggleChildren = () => {
    setChildrenIsActive(!childrenIsActive);
  };

  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (childrenIsActive && activeChildLink) {
        if (ref.current && !ref.current.contains(event.target)) {
          setChildrenIsActive(false);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, activeChildLink]);

  return (
    <ChildrenNavContainer bgColor={bgColor} ref={ref}>
      <Links>
        <LogoSection>Nemeton</LogoSection>
        {menu_links?.map((link, index) => {
          return link?.type === "isDropdown" ? (
            <Link
              key={index}
              index={index}
              theLink={link}
              dropdownLink
              to={link?.to}
              isActiveLink={activeChildLink}
              onClick={() => toggleChildren(link)}
            />
          ) : link?.type === "isButton" ? (
            <Link
              key={index}
              to={link?.to}
              theLink={link}
              isButton
              isActiveLink={activeChildLink}
              onClick={() => toggleChildren(link)}
            />
          ) : link?.type === "withIcon" ? (
            <Link
              key={index}
              theLink={link}
              to={link?.to}
              isActiveLink={activeChildLink}
              onClick={() => toggleChildren(link)}
              withIcon
            />
          ) : (
            <Link
              key={index}
              theLink={link}
              to={link?.to}
              isActiveLink={activeChildLink}
              onClick={() => toggleChildren(link)}
            />
          );
        })}
      </Links>
      {childrenIsActive && (
        <ChildrenContent childrenIsActive={childrenIsActive}>
          <div>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
            <p>test</p>
          </div>
        </ChildrenContent>
      )}
    </ChildrenNavContainer>
  );
};

export default Nav;
