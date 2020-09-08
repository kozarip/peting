import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

export async function registerFetchTask(taskName, jobCallback, interval) {
  TaskManager.defineTask(taskName, jobCallback);

  const status = await BackgroundFetch.getStatusAsync();
  switch (status) {
    case BackgroundFetch.Status.Restricted:
    case BackgroundFetch.Status.Denied:
        console.log("Background execution is disabled");
        return;

    default: {
        console.log("Background execution allowed");

        let tasks = await TaskManager.getRegisteredTasksAsync();
        if (tasks.find(f => f.taskName === taskName) == null) {
            console.log("Registering task");
            await BackgroundFetch.registerTaskAsync(taskName,{
                minimumInterval: 15,
                stopOnTerminate: false,
                startOnBoot: true,
            });

            tasks = await TaskManager.getRegisteredTasksAsync();
            console.log("Registered tasks", tasks);
        } else {
            console.log(`Task ${taskName} already registered, skipping`);
        }

        console.log("Setting interval to", interval);
        await BackgroundFetch.setMinimumIntervalAsync(interval);
    }
  }
}