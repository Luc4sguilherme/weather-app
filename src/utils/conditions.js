export default function conditions(condition, horary = 'day') {
  switch (condition) {
    case 'Thunderstorm':
      return {
        name: 'thunderstorm',
        color: 'gray',
      };
    case 'Clear':
      if (horary === 'night') {
        return {
          name: 'cloudy-night',
          color: 'gray',
        };
      }

      return {
        name: 'partly-sunny',
        color: '#ffb300',
      };
    case 'Rain':
      return {
        name: 'rainy',
        color: '#1ec9ff',
      };
    case 'Clouds':
      return {
        name: 'cloud',
        color: '#1ec9ff',
      };
    case 'Snow':
      return {
        name: 'snow',
        color: '#1ec9ff',
      };
    case 'Drizzle':
      return {
        name: 'rainy',
        color: '#1ec9ff',
      };
    default:
      return {
        name: 'cloud',
        color: '#1ec9ff',
      };
  }
}
