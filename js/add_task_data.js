let tasks = [
  {
    id: 1,
    title: "Daily Kochwelt Recipe",
    description: "Implement daily recipe and portion calculator....",
    dueDate: "2024-05-16",
    assigned: ["Anja Schulze", "Anton Mayer", "Benedikt Ziegler", "Emmanuel Mauer", "Eva Fischer", "Marcel Muster"],
    priorityContent: `\n<div class="textMedium" id="textMedium" style="color: black;">Medium</div>\n<svg xmlns="http://www.w3.org/2000/svg" width="21" height="8" viewBox="0 0 21 8">\n 
        <g clip-path="url(#clip0_156_972)">\n                        
        <path class="img-priorityMedium imgPrio-active" d="M19.7596 7.91693H1.95136C1.66071 7.91693 1.38197 7.80063 1.17645 7.59362C0.970928 7.3866 0.855469 7.10584 0.855469 6.81308C0.855469 6.52032 0.970928 6.23955 1.17645 6.03254C1.38197 5.82553 1.66071 5.70923 1.95136 5.70923H19.7596C20.0502 5.70923 20.329 5.82553 20.5345 6.03254C20.74 6.23955 20.8555 6.52032 20.8555 6.81308C20.8555 7.10584 20.74 7.3866 20.5345 7.59362C20.329 7.80063 20.0502 7.91693 19.7596 7.91693Z" fill="#FFA800"></path>\n                        
        <path class="img-priorityMedium imgPrio-active" d="M19.7596 2.67376H1.95136C1.66071 2.67376 1.38197 2.55746 1.17645 2.35045C0.970928 2.14344 0.855469 1.86267 0.855469 1.56991C0.855469 1.27715 0.970928 0.996386 1.17645 0.789374C1.38197 0.582363 1.66071 0.466064 1.95136 0.466064L19.7596 0.466064C20.0502 0.466064 20.329 0.582363 20.5345 0.789374C20.74 0.996386 20.8555 1.27715 20.8555 1.56991C20.8555 1.86267 20.74 2.14344 20.5345 2.35045C20.329 2.55746 20.0502 2.67376 19.7596 2.67376Z" fill="#FFA800"></path>\n</g>\n<defs>\n                        
        <clipPath id="clip0_156_972">\n                          <rect width="20" height="7.45098" transform="translate(0.855469 0.466064)"></rect>\n                        
        </clipPath>\n                      
        </defs>\n                    
        </svg>\n                  
        `,
    priorityID: "priorityMedium",
    subtasks: [],
    taskStatus: "awaitFeedback",
    category: ["User Story", {}],
  },
  {
    id: 2,
    title: "CSS Architecture Planning",
    description: "Define CSS naming conventions and structure...",
    dueDate: "2024-05-01",
    assigned: ["Anja Schulze", "Marcel Muster"],
    priorityContent: `\n<div class="textUrgent" id="textUrgent" style="color: black;">Urgent</div>\n<svg class="img-priorityUrgentSize" xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16">\n
        <g clip-path="url(#clip0_114904_5525)">\n                        
        <path class="img-priorityUrgent imgPrio-active" d="M19.6528 15.2547C19.4182 15.2551 19.1896 15.1803 19.0007 15.0412L10.7487 8.958L2.49663 15.0412C2.38078 15.1267 2.24919 15.1887 2.10939 15.2234C1.96959 15.2582 1.82431 15.2651 1.68184 15.2437C1.53937 15.2223 1.40251 15.1732 1.27906 15.099C1.15562 15.0247 1.04801 14.927 0.96238 14.8112C0.876751 14.6954 0.814779 14.5639 0.780002 14.4243C0.745226 14.2846 0.738325 14.1394 0.759696 13.997C0.802855 13.7095 0.958545 13.4509 1.19252 13.2781L10.0966 6.70761C10.2853 6.56802 10.5139 6.49268 10.7487 6.49268C10.9835 6.49268 11.212 6.56802 11.4007 6.70761L20.3048 13.2781C20.4908 13.415 20.6286 13.6071 20.6988 13.827C20.7689 14.0469 20.7678 14.2833 20.6955 14.5025C20.6232 14.7216 20.4834 14.9124 20.2962 15.0475C20.1089 15.1826 19.8837 15.2551 19.6528 15.2547Z" fill="#FF3D00"></path>\n                        
        <path class="img-priorityUrgent imgPrio-active" d="M19.6528 9.50568C19.4182 9.50609 19.1896 9.43124 19.0007 9.29214L10.7487 3.20898L2.49663 9.29214C2.26266 9.46495 1.96957 9.5378 1.68184 9.49468C1.39412 9.45155 1.13532 9.29597 0.962385 9.06218C0.789449 8.82838 0.716541 8.53551 0.7597 8.24799C0.802859 7.96048 0.95855 7.70187 1.19252 7.52906L10.0966 0.958588C10.2853 0.818997 10.5139 0.743652 10.7487 0.743652C10.9835 0.743652 11.212 0.818997 11.4007 0.958588L20.3048 7.52906C20.4908 7.66598 20.6286 7.85809 20.6988 8.07797C20.769 8.29785 20.7678 8.53426 20.6955 8.75344C20.6232 8.97262 20.4834 9.16338 20.2962 9.29847C20.1089 9.43356 19.8837 9.50608 19.6528 9.50568Z" fill="#FF3D00"></path>\n</g>\n<defs>\n                        
        <clipPath id="clip0_114904_5525">\n                          
        <rect width="20" height="14.5098" transform="translate(0.748535 0.745117)"></rect>\n                        
        </clipPath>\n                      
        </defs>\n                    
        </svg>\n                  
        `,
    priorityID: "priorityUrgent",
    subtasks: ["Structure", "Naming conventions"],
    taskStatus: "done",
    category: ["Technical Task", {}],
  },
  {
    id: 3,
    title: "Kochwelt Page & Recipe Recommender",
    description: "Build start page with recipe recommendation...",
    dueDate: "2024-04-17",
    assigned: ["Anton Mayer", "Emmanuel Mauer", "Marcel Muster"],
    priorityContent: `\n<div class="textMedium" id="textMedium" style="color: black;">Medium</div>\n                    
         <svg xmlns="http://www.w3.org/2000/svg" width="21" height="8" viewBox="0 0 21 8">\n                      
         <g clip-path="url(#clip0_156_972)">\n                        
         <path class="img-priorityMedium imgPrio-active" d="M19.7596 7.91693H1.95136C1.66071 7.91693 1.38197 7.80063 1.17645 7.59362C0.970928 7.3866 0.855469 7.10584 0.855469 6.81308C0.855469 6.52032 0.970928 6.23955 1.17645 6.03254C1.38197 5.82553 1.66071 5.70923 1.95136 5.70923H19.7596C20.0502 5.70923 20.329 5.82553 20.5345 6.03254C20.74 6.23955 20.8555 6.52032 20.8555 6.81308C20.8555 7.10584 20.74 7.3866 20.5345 7.59362C20.329 7.80063 20.0502 7.91693 19.7596 7.91693Z" fill="#FFA800"></path>\n                        
         <path class="img-priorityMedium imgPrio-active" d="M19.7596 2.67376H1.95136C1.66071 2.67376 1.38197 2.55746 1.17645 2.35045C0.970928 2.14344 0.855469 1.86267 0.855469 1.56991C0.855469 1.27715 0.970928 0.996386 1.17645 0.789374C1.38197 0.582363 1.66071 0.466064 1.95136 0.466064L19.7596 0.466064C20.0502 0.466064 20.329 0.582363 20.5345 0.789374C20.74 0.996386 20.8555 1.27715 20.8555 1.56991C20.8555 1.86267 20.74 2.14344 20.5345 2.35045C20.329 2.55746 20.0502 2.67376 19.7596 2.67376Z" fill="#FFA800"></path>\n</g>\n<defs>\n                        
         <clipPath id="clip0_156_972">\n                          <rect width="20" height="7.45098" transform="translate(0.855469 0.466064)"></rect>\n                        
         </clipPath>\n
         </defs>\n                    
         </svg>\n                  
         `,
    priorityID: "priorityMedium",
    subtasks: ["Recommended recipe China", "Recommended recipe Italy"],
    taskStatus: "inProgress",
    category: ["User Story", {}],
  },
  {
    id: 4,
    title: "HTML Base Template Creation",
    description: "Create reusable HTML base templates...",
    dueDate: "2024-08-30",
    assigned: ["Anja Schulze", "Marcel Muster", "Tatjana Wolf"],
    priorityContent: `\n<div class="textLow" id="textLow" style="color: black;">Low</div>\n
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16">\n                      
        <path class="img-priorityLow imgPrio-active" d="M10.8555 9.69779C10.6209 9.69819 10.3923 9.62335 10.2035 9.48427L1.30038 2.91453C1.18454 2.82898 1.0867 2.72146 1.01245 2.59812C0.938193 2.47478 0.888977 2.33803 0.867609 2.19569C0.824455 1.90821 0.897354 1.61537 1.07027 1.3816C1.24319 1.14782 1.50196 0.992265 1.78965 0.949143C2.07734 0.906021 2.3704 0.978866 2.60434 1.15165L10.8555 7.23414L19.1066 1.15165C19.2224 1.0661 19.354 1.00418 19.4938 0.969432C19.6336 0.934685 19.7788 0.927791 19.9213 0.949143C20.0637 0.970495 20.2006 1.01967 20.324 1.09388C20.4474 1.16808 20.555 1.26584 20.6407 1.3816C20.7263 1.49735 20.7883 1.62882 20.823 1.7685C20.8578 1.90818 20.8647 2.05334 20.8433 2.19569C20.822 2.33803 20.7727 2.47478 20.6985 2.59812C20.6242 2.72146 20.5264 2.82898 20.4106 2.91453L11.5075 9.48427C11.3186 9.62335 11.0901 9.69819 10.8555 9.69779Z" fill="#7AE229"></path>\n                      
        <path class="img-priorityLow imgPrio-active" d="M10.8555 15.4463C10.6209 15.4467 10.3923 15.3719 10.2035 15.2328L1.30038 8.66307C1.06644 8.49028 0.910763 8.2317 0.867609 7.94422C0.824455 7.65674 0.897354 7.3639 1.07027 7.13013C1.24319 6.89636 1.50196 6.7408 1.78965 6.69768C2.07734 6.65456 2.3704 6.7274 2.60434 6.90019L10.8555 12.9827L19.1066 6.90019C19.3405 6.7274 19.6336 6.65456 19.9213 6.69768C20.209 6.7408 20.4678 6.89636 20.6407 7.13013C20.8136 7.3639 20.8865 7.65674 20.8433 7.94422C20.8002 8.2317 20.6445 8.49028 20.4106 8.66307L11.5075 15.2328C11.3186 15.3719 11.0901 15.4467 10.8555 15.4463Z" fill="#7AE229"></path>\n                    
        </svg>\n                  
        `,
    priorityID: "priorityLow",
    subtasks: [],
    taskStatus: "awaitFeedback",
    category: ["Technical Task", {}],
  },
];
