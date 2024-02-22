import Images from '../../media';
const dummyCardData = [
  {
    title: 'Sample Card Title 1',
    description:
      'This is a sample card description. It can contain some details about the card.',
    primaryIcon: 'call',
    primaryIconData: 'Data for primary icon 1',
    secondaryIcon: 'mail',
    secondaryIconData: 'Data for secondary icon 1',
    isPressable: true,
    pressableText: 'View',
    imageSource: Images.User,
  },
  {
    title: 'Sample Card Title 2',
    description:
      'Another sample card description. It can contain different details about the card.',
    primaryIcon: 'call',
    primaryIconData: 'Data for primary icon 2',
    secondaryIcon: 'mail',
    secondaryIconData: 'Data for secondary icon 2',
    isPressable: true,
    pressableText: 'View Details',
    imageSource: Images.User,
  },
  {
    title: 'Sample Card Title 3',
    description:
      'Yet another sample card description. It can have unique details about the card.',
    primaryIcon: 'call',
    primaryIconData: 'Data for primary icon 3',
    secondaryIcon: 'mail',
    secondaryIconData: 'Data for secondary icon 3',
    isPressable: true,
    pressableText: 'Read More',
    imageSource: Images.User,
  },
];

const Account = [
  {
    title: 'Update Password',
    navigate: false,
    icon: 'key-outline',
  },
  {
    title: 'Update Profile Picture',
    navigate: false,
    icon: 'image-outline',
  },
  {
    title: 'Delete Account',
    navigate: false,
    icon: 'trash-bin-outline',
  },
  {
    title: 'Privacy Policy',
    navigate: false,
    icon: 'shield-checkmark-outline',
  },
  {
    title: 'Logout',
    navigate: true,
    icon: 'log-out-outline',
  },
];
const onboardingData = [
  {
    image: 'Onboarding1',
    progress: 'ProgressBar1',
    heading: 'Trusted by millions of people, part of one part',
  },
  {
    image: 'Onboarding2',
    progress: 'ProgressBar2',

    heading: 'Spend money abroad, and track your expense',
  },
  {
    image: 'Onboarding3',
    progress: 'ProgressBar3',

    heading: 'Receive Money From Anywhere In The World',
  },
];
export default {dummyCardData, Account, onboardingData};
