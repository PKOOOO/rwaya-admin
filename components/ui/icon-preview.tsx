"use client";

import React from "react";

// Import only commonly used icons to reduce bundle size
import { 
  FaHome, FaUser, FaShoppingCart, FaHeart, FaStar, FaSearch, FaPlus, FaMinus, FaEdit, FaTrash,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCalendar, FaCheck, FaTimes, FaArrowLeft, FaArrowRight,
  FaBars, FaTimes as FaClose, FaDownload, FaUpload, FaEye, FaEyeSlash, FaLock, FaUnlock,
  FaCog, FaBell, FaQuestion, FaInfo, FaExclamation, FaWarning, FaCheckCircle, FaTimesCircle
} from "react-icons/fa";

import { 
  MdHome, MdPerson, MdShoppingCart, MdFavorite, MdStar, MdSearch, MdAdd, MdRemove, MdEdit, MdDelete,
  MdPhone, MdEmail, MdLocationOn, MdAccessTime, MdDateRange, MdCheck, MdClose, MdArrowBack, MdArrowForward,
  MdMenu, MdClose as MdCloseIcon, MdDownload, MdUpload, MdVisibility, MdVisibilityOff, MdLock, MdLockOpen,
  MdSettings, MdNotifications, MdHelp, MdInfo, MdError, MdWarning, MdCheckCircle, MdCancel
} from "react-icons/md";

import { 
  RiHomeLine, RiUserLine, RiShoppingCartLine, RiHeartLine, RiStarLine, RiSearchLine, RiAddLine, RiSubtractLine, RiEditLine, RiDeleteBinLine,
  RiPhoneLine, RiMailLine, RiMapPinLine, RiTimeLine, RiCalendarLine, RiCheckLine, RiCloseLine, RiArrowLeftLine, RiArrowRightLine,
  RiMenuLine, RiCloseLine as RiCloseIcon, RiDownloadLine, RiUploadLine, RiEyeLine, RiEyeOffLine, RiLockLine, RiLockUnlockLine,
  RiSettingsLine, RiNotificationLine, RiQuestionLine, RiInformationLine, RiErrorWarningLine, RiAlertLine, RiCheckboxCircleLine, RiCloseCircleLine
} from "react-icons/ri";

// Create a more manageable icon library with only essential icons
const iconLibraries = { 
  // FontAwesome icons
  FaHome, FaUser, FaShoppingCart, FaHeart, FaStar, FaSearch, FaPlus, FaMinus, FaEdit, FaTrash,
  FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCalendar, FaCheck, FaTimes, FaArrowLeft, FaArrowRight,
  FaBars, FaClose, FaDownload, FaUpload, FaEye, FaEyeSlash, FaLock, FaUnlock,
  FaCog, FaBell, FaQuestion, FaInfo, FaExclamation, FaWarning, FaCheckCircle, FaTimesCircle,
  
  // Material Design icons
  MdHome, MdPerson, MdShoppingCart, MdFavorite, MdStar, MdSearch, MdAdd, MdRemove, MdEdit, MdDelete,
  MdPhone, MdEmail, MdLocationOn, MdAccessTime, MdDateRange, MdCheck, MdClose, MdArrowBack, MdArrowForward,
  MdMenu, MdCloseIcon, MdDownload, MdUpload, MdVisibility, MdVisibilityOff, MdLock, MdLockOpen,
  MdSettings, MdNotifications, MdHelp, MdInfo, MdError, MdWarning, MdCheckCircle, MdCancel,
  
  // Remix icons
  RiHomeLine, RiUserLine, RiShoppingCartLine, RiHeartLine, RiStarLine, RiSearchLine, RiAddLine, RiSubtractLine, RiEditLine, RiDeleteBinLine,
  RiPhoneLine, RiMailLine, RiMapPinLine, RiTimeLine, RiCalendarLine, RiCheckLine, RiCloseLine, RiArrowLeftLine, RiArrowRightLine,
  RiMenuLine, RiCloseIcon, RiDownloadLine, RiUploadLine, RiEyeLine, RiEyeOffLine, RiLockLine, RiLockUnlockLine,
  RiSettingsLine, RiNotificationLine, RiQuestionLine, RiInformationLine, RiErrorWarningLine, RiAlertLine, RiCheckboxCircleLine, RiCloseCircleLine
};

// Get all available icon names - memoized for performance
export const getAllIconNames = () => Object.keys(iconLibraries);

// Icon Preview Component - Memoized for performance
export const IconPreview = React.memo(({ iconName, className = "h-6 w-6" }: { iconName: string; className?: string }) => {
  const IconComponent = iconLibraries[iconName as keyof typeof iconLibraries];

  if (!IconComponent) {
    return <span className="text-gray-500 text-sm">Invalid Icon</span>;
  }

  return <IconComponent className={className} />;
});

IconPreview.displayName = "IconPreview";

// Hook to get filtered icons
export const useFilteredIcons = (search: string) => {
  return React.useMemo(() => {
    const allIcons = getAllIconNames();
    return allIcons.filter((icon) =>
      icon.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);
};
