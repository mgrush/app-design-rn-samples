//
//  CalendarManager.m
//  demo
//
//  Created by yuquan on 2018/10/17.
//  Copyright © 2018年 650 Industries, Inc. All rights reserved.
//

#import "CalendarManager.h"
#import <React/RCTLog.h>
#import <React/RCTConvert.h>

@implementation CalendarManager

RCT_EXPORT_MODULE()

- (NSArray<NSString *> *)supportedEvents {
    return @[@"EventReminder"];
}


- (void)calendarEventReminderReceived:(NSNotification *)notification
{
    NSString *eventName = notification.userInfo[@"name"];
    [self sendEventWithName:@"EventReminder" body:@{@"name": eventName}];
}

RCT_EXPORT_METHOD(addEvent:(NSString *)name location:(NSDictionary *)details)
{
    NSString *location = [RCTConvert NSString:details[@"location"]];
    NSDate *time = [RCTConvert NSDate:details[@"time"]];
    
    
    RCTLogInfo(@"Pretending to create an event %@ at %@ on %@", name, location, time);
}

RCT_EXPORT_METHOD(findEvents:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject)
{
    resolve(@"This is the resolve result");
}

@end
