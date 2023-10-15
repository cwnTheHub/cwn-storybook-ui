import React from "react";
import { useState } from "react";
import { Tags } from "../../../common";

export default {
  title: "Common components/Tags",
  component: Tags,
};

const Template = (args) => {
  return <Tags {...args}>{args.children}</Tags>;
};

export const MinimalUse = Template.bind({});
MinimalUse.args = {
  copy: "en",
  children: (
    <>
      <Tags.Item onClick={() => console.log("selected")}>Jolla</Tags.Item>
      <Tags.Item isSelected onClick={() => console.log("selected")}>
        Blackberry
      </Tags.Item>
    </>
  ),
};

export const ChildrenOptions = () => {
  const [initialState, setState] = useState({
    tags: [
      {
        children: "Palm",
        isSelected: false,
        isLoading: false,
      },
      {
        children: "Jolla",
        isSelected: false,
        isLoading: false,
      },
      {
        children: "Blackberry",
        isSelected: false,
        isLoading: false,
      },
    ],
  });

  const handleClick = (name) => {
    const tags = initialState.tags.map((tag) => {
      if (name === tag.children) {
        return {
          ...tag,
          isSelected: !tag.isSelected,
        };
      }
      return tag;
    });
    setState({ tags });
  };

  return (
    <Tags copy="en" onClick={handleClick}>
      {initialState.tags.map((tag) => (
        <Tags.Item key={tag.children} {...tag} />
      ))}
    </Tags>
  );
};

export const TagsOptions = () => {
  const [initialState, setState] = useState({
    tags: [
      {
        children: "Palm",
        isSelected: false,
        isLoading: false,
      },
      {
        children: "Jolla",
        isSelected: false,
        isLoading: false,
      },
      {
        children: "Blackberry",
        isSelected: false,
        isLoading: false,
      },
    ],
  });

  const handleClick = (name) => {
    const tags = initialState.tags.map((tag) => {
      if (name === tag.children) {
        return {
          ...tag,
          isSelected: !tag.isSelected,
        };
      }
      return tag;
    });
    setState({ tags });
  };

  return <Tags copy="fr" tags={initialState.tags} onClick={handleClick} />;
};
