import { VisaChevronRightTiny } from '@visa/nova-icons-react';
import {
  ContentCard,
  ContentCardBody,
  ContentCardSubtitle,
  ContentCardTitle,
  Typography,
  Utility,
} from '@visa/nova-react';

type ClickableMessageProp= {
  headline: string;
  subtitle: string;
  description?: string;
};

export const ClickableMessageCard = ({
  headline,
  subtitle,
  description,
}: ClickableMessageProp) => {
  return (
    <ContentCard clickable tag='button'>
      <Utility
        element={<ContentCardBody tag='span' />}
        vAlignItems='start'
        vFlex
        vFlexCol
        vGap={4}
      >
        <ContentCardTitle variant='headline-4' tag='span'>
          {headline}
          <VisaChevronRightTiny rtl className='v-icon-move' />
        </ContentCardTitle>
        <ContentCardSubtitle variant='subtitle-3' tag='span'>
          {subtitle}
        </ContentCardSubtitle>
        <Utility element={<Typography tag='span' />} vPaddingTop={4}>
          {description}
        </Utility>
      </Utility>
    </ContentCard>
  );
};