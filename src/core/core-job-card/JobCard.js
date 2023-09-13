import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Card from "../core-card/Card";
import { FlexGrid } from "../core-flex-grid";
import Heading from "../core-heading/Heading";
import Paragraph from "../core-paragraph/Paragraph";
import Box from "../core-box/Box";
import { Add, IconButton, Subtract } from "../core-interactive-icon";
import { getCopy } from "../../util-helpers";
import { Fade, Reveal } from "../../shared-animation";
import styled from "styled-components";
import copyDictionary from "./JobCardText";
import Responsive from "../core-responsive";
import Link from "../core-link/Link";
import { Link as ReactRouterLink } from "react-router-dom";
import Text from "../core-text/Text";
import Notification from "../core-notification/Notification";
import UnorderedList from "../core-unordered-list/UnorderedList";
import { Bookmark } from "../core-decorative-icon";

const StyledDismissButtonWrapper = styled.div({
  marginLeft: "auto",
  height: "1.5rem",
  position: "relative",
  marginTop: "-0.5rem",
  marginRight: "-0.5rem",
});

const LinkWrapper = ({ ...rest }) => (
  <Link
    {...rest}
    reactRouterLinkComponent={rest.to ? ReactRouterLink : undefined}
  />
);

const JobCard = ({
  spacing,
  setSelected,
  selected,
  detail,
  copy,
  dismissible,
  truncate,
  numberOfLines,
}) => {
  const [dismissed, setDismissed] = useState(false);
  const [isSet, setIsSet] = useState(false);
  const [contentWrapperHeight, setContentWrapperHeight] = useState(undefined);
  const [contentWrapper, setContentWrapper] = useState(undefined);

  useEffect(() => {
    if (dismissible) {
      window.addEventListener("resize", adjustContentHeight);
    }
    window.removeEventListener("resize", adjustContentHeight);
  }, [dismissible]);

  const adjustContentHeight = () => {
    if (
      contentWrapper &&
      contentWrapper.offsetHeight !== contentWrapperHeight
    ) {
      setContentWrapperHeight(contentWrapper?.offsetHeight);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    setIsSet(true);
    setSelected(detail);
  };

  const toBeDismiss = (e) => {
    setIsSet(true);
    setSelected(undefined);
    console.log("to be dismissed ...");
  };

  const renderData = ({
    id,
    title,
    companyName,
    ratingsDiplay,
    companyLocation,
    jobType,
    shiftAndSchedule,
    requirements,
    applyWithUs,
    urgentHiring,
    description,
    to,
    howToApply,
    applicationDeadline,
    numberOfPostAvalaible,
    createdOn,
    updatedOn,
  }) => {
    return (
      <Responsive minWidth="md">
        {(matches) =>
          matches ? (
            <Card
              variant={isSet ? "defaultWithBorder" : "defaultOnlyBorder"}
              onClick={handleClick}
              spacing={spacing}
            >
              <Box between={3}>
                <Box inline between={"space-between"}>
                  <Box>
                    <Heading level="h3">{title}</Heading>
                    <Box inline between={2}>
                      <Text small>{companyName}</Text>
                      <Text bold>{ratingsDiplay}</Text>
                    </Box>
                    <Text>{companyLocation}</Text>
                  </Box>
                  <Box inline between={1}>
                    {dismissible && (
                      <StyledDismissButtonWrapper>
                        <IconButton
                          icon={Subtract}
                          a11yText={getCopy(copyDictionary, copy).close}
                          onClick={() => {
                            setDismissed(true);
                            toBeDismiss(detail);
                          }}
                        />
                      </StyledDismissButtonWrapper>
                    )}
                    <StyledDismissButtonWrapper>
                      <IconButton
                        icon={Add}
                        variant={"alternative"}
                        a11yText={getCopy(copyDictionary, copy).close}
                        onClick={() => {
                          console.log("bookmarking this...");
                        }}
                      />
                    </StyledDismissButtonWrapper>
                  </Box>
                </Box>
                <Box inline between={3}>
                  {jobType && (
                    <Notification copy={copy}>
                      <Text bold>{jobType[0]}</Text>
                      <Text small> +{jobType?.length}</Text>
                    </Notification>
                  )}
                  {shiftAndSchedule && (
                    <Notification copy={copy}>
                      <Text bold>{shiftAndSchedule[0]}</Text>
                      <Text small> +{shiftAndSchedule?.length}</Text>
                    </Notification>
                  )}
                </Box>
                <Box inline between={2}>
                  {applyWithUs && (
                    <Notification variant={"success"}>
                      <Text small>Apply with us</Text>
                    </Notification>
                  )}
                  {urgentHiring && (
                    <Notification copy={copy}>
                      <Text bold>Urgently hiring</Text>
                    </Notification>
                  )}
                </Box>
                {description ? (
                  <Paragraph truncate={truncate} numberOfLines={numberOfLines}>
                    {description}
                  </Paragraph>
                ) : null}
              </Box>
            </Card>
          ) : (
            <Card variant={"defaultWithBorder"} spacing={spacing}>
              <Box between={3}>
                <Box>
                  <LinkWrapper to={detail?.to}>
                    <Heading level="h3">{title}</Heading>
                  </LinkWrapper>
                  <Box inline between={2}>
                    <Text small>{companyName}</Text>
                    <Text bold>{ratingsDiplay}</Text>
                  </Box>
                  <Text>{companyLocation}</Text>
                </Box>

                <Box inline between={2}>
                  {jobType && (
                    <Notification copy={copy}>
                      <Text bold>{jobType[0]}</Text>
                      <Text small> +{jobType?.length}</Text>
                    </Notification>
                  )}
                  {shiftAndSchedule && (
                    <Notification copy={copy}>
                      <Text bold>{shiftAndSchedule[0]}</Text>
                      <Text small> +{shiftAndSchedule?.length}</Text>
                    </Notification>
                  )}
                </Box>
                <Box inline between={3}>
                  {applyWithUs && (
                    <Notification variant={"success"}>
                      <Text small>Apply with us</Text>
                    </Notification>
                  )}
                  {urgentHiring && (
                    <Notification copy={copy}>
                      <Text bold>Urgently hiring</Text>
                    </Notification>
                  )}
                </Box>
                {description ? (
                  <Paragraph truncate={truncate} numberOfLines={numberOfLines}>
                    {description}
                  </Paragraph>
                ) : null}
              </Box>
            </Card>
          )
        }
      </Responsive>
    );
  };

  const renderJobCard = () => {
    return (
      <FlexGrid>
        <FlexGrid.Row>
          <FlexGrid.Col xs={12} md={5}>
            {renderData({ ...detail })}
          </FlexGrid.Col>
        </FlexGrid.Row>
      </FlexGrid>
    );
  };

  if (dismissible) {
    const fadeDuration = 500;
    const revealDuration = 400;
    return (
      <Reveal
        timeout={revealDuration}
        delay={fadeDuration}
        in={!dismissed}
        height={contentWrapperHeight || "auto"}
        unmountOnExit
      >
        {() => (
          <Fade timeout={fadeDuration} in={!dismissed}>
            {() => (
              <div
                ref={(c) => {
                  setContentWrapper(c);
                }}
              >
                {renderJobCard()}
              </div>
            )}
          </Fade>
        )}
      </Reveal>
    );
  }
  return renderJobCard();
};

JobCard.propTypes = {
  spacing: PropTypes.oneOf(["default", "narrow", "compact", "intermediate"]),
  setSelected: PropTypes.func,
  selected: PropTypes.bool,
  truncate: PropTypes.bool,
  numberOfLines: PropTypes.number,
  detail: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string,
    ratingsDiplay: PropTypes.number,
    companyLocation: PropTypes.string,

    jobType: PropTypes.arrayOf(PropTypes.string),
    shiftAndSchedule: PropTypes.arrayOf(PropTypes.string),

    applyWithUs: PropTypes.bool,
    urgentHiring: PropTypes.bool,

    description: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    howToApply: PropTypes.string,
    applicationDeadline: PropTypes.string,
    numberOfPostAvalaible: PropTypes.number,

    createdOn: PropTypes.string,
    updatedOn: PropTypes.string,
  }),
  dismissible: PropTypes.bool,
  copy: PropTypes.oneOfType([
    PropTypes.oneOf(["en", "fr"]),
    PropTypes.shape({
      feedback: PropTypes.string.isRequired,
      close: PropTypes.string.isRequired,
    }),
  ]).isRequired,
};

JobCard.defaultProps = {
  setSelected: (data) => {
    console.log(data);
  },
  truncate: true,
  numberOfLines: 5,
  dismissible: true,
  spacing: "narrow",
  detail: {
    id: 1,
    title: "Software Engineer",
    companyName: "Tech Innovators Inc.",
    ratingsDiplay: 4.5,
    companyLocation: "San Francisco, CA",
    jobType: ["Full-Time", "Permanent"],
    shiftAndSchedule: ["Day Shift", "Monday to Friday"],
    applyWithUs: true,
    urgentHiring: false,
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed accumsan justo nec bibendum. Nullam sit amet metus eu elit venenatis bibendum. Cras eget efficitur lorem. Sed cursus dui ut quam dapibus, in hendrerit lectus facilisis. Phasellus eget lectus vel odio luctus consectetur. Proin et nisl ut erat tincidunt sollicitudin. Integer ultricies, ante vel vulputate gravida, velit mi facilisis libero, id interdum arcu libero eu tellus. Nulla facilisi. Integer posuere justo at quam rhoncus hendrerit. Curabitur non euismod augue, eget hendrerit turpis.",
    to: "San Francisco, CA",
    howToApply: "To apply, please submit your resume...",
    applicationDeadline: "2023-10-30",
    numberOfPostAvailable: 3,
    createdOn: "2023-09-15",
    updatedOn: "2023-09-20",
  },
  copy: "en",
};

export default JobCard;
