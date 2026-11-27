import blockContent from './blockContent'
import post from './post'
import localizedString from './localizedString'
import localizedBlockContent from './localizedBlockContent'
import course from './course'
import courseType from './courseType'
import gallery from './gallery'
import accordionItem from './accordionItem'
import announcement from './announcement'
import legalPage from './legalPage'
import application from './application'
import localizedText from './localizedText'
import trainer from './trainer'
import programScheme from './programScheme'
import thanksLetter from './thanksLetter'
import {COURSE_BLOCKS} from './courseBlocks'

export const schemaTypes = [
  post,
  blockContent,
  localizedString,
  localizedBlockContent,
  course,
  courseType,
  gallery,
  accordionItem,
  announcement,
  legalPage,
  application,
  localizedText,
  trainer,
  programScheme,
  thanksLetter,
  ...COURSE_BLOCKS,
]
