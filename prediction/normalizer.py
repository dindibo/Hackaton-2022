#!/usr/bin/python3

from heatpoint import heatpoint

class TRUNCATION_METHOD:
    PERCENTAGE  =0
    ABSOLUTE    =1
    
class SCALING_METHOD:
    LINEAR      =0
    LOGARITHMIC =1

class average_normalizer:

    def __init__(self, points : list, threshold, truncate_method : TRUNCATION_METHOD = TRUNCATION_METHOD.PERCENTAGE) -> None:
        self.points = points
        self.truncate_method = truncate_method
        self.threshold = threshold

    def set_points(self, points : list):
        self.points = points

    def __truncate_by_number(self, number):
        lst = self.points

        if number >= len(lst):
            return lst

        # Big values first
        lst.sort(reverse=True, key=lambda x: x.heat)

        return lst[:number]

    # value in percent if percentage
    def truncate_data(self, value):
        if self.truncate_method == TRUNCATION_METHOD.ABSOLUTE:
            return self.__truncate_by_number(value)
        elif self.truncate_method == TRUNCATION_METHOD.PERCENTAGE:
            portion = int((float(value) / 100.) * len(self.points))
            return self.__truncate_by_number(portion)
        else:
            raise 1

    def scale(self, points : list, skip_sort=False):
        if not skip_sort:
            points.sort(reverse=True, key=lambda x: x.heat)

        # Sub min
        _min = points[-1].heat
        points = [heatpoint(x.coord, x.heat - _min) for x in points]

        # Div
        new_max = points[0].heat
        points = [heatpoint(x.coord, x.heat / float(new_max)) for x in points]

        return points

    def generate(self):
        self.points = self.truncate_data(self.threshold)
        
        # TODO: Assert sorted
        self.points = self.scale(self.points, skip_sort=True)

        return self.points
