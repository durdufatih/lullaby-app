export type Lullaby = {
    id: string;
    name: string;
    image: any;
    duration:any,
    path:string;
  };

  export interface PodcastItemProps {
    title: string;
    duration: string;
    imageUrl: string;
  }
  
  export interface NavigationIconProps {
    imageUrl: string;
    width: number;
    aspectRatio: number;
    marginTop?: number;
  }
  export interface AudioControlProps {
    time: string;
    onPress?: () => void;
  }
  
  export interface PodcastHeaderProps {
    title: string;
    description: string;
  }
  
  export interface ProgressBarProps {
    currentTime: string;
    totalTime: string;
  }