import styled from "styled-components";
import { withStyledComponent } from "../../../shared-hocs";
import { mediumFont, sizeMedium } from "../../../shared-typography/typography";
import { media } from "../../core-responsive";

import List, { StyledList, StyledListItem } from "../List/List";

const StyledFootnoteListItem = styled(StyledListItem)({
  "& > span": {
    ...mediumFont,
  },
  ...media.from("md").css({
    paddingLeft: "2rem",
  }),
});
const StyledFootnoteList = styled(StyledList)({
  ...sizeMedium,
  marginLeft: "1rem",
  ...media.from("md").css({
    marginLeft: 0,
  }),
});

const FootnoteList = withStyledComponent(StyledFootnoteList)(List);
const FootnoteListItem = withStyledComponent(StyledFootnoteListItem)(List.Item);

FootnoteList.Item = FootnoteListItem;

export default FootnoteList;
