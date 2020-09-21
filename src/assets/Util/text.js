export const getProfileFullName = (user) => {
    if (user && user.profile) {
      return `${user.profile.firstName} ${user.profile.lastName}`;
    }
    return '';
  };