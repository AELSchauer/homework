require_relative '../lib/plan_table'

class ZipCode
  attr_reader :data, :plan_table, :zip_code, :state

  def initialize(rows)
    @data = rows
    @zip_code = data[0][:zipcode]
    @state = data[0][:state]
    @plan_table = PlanTable.new
  end

  def rate_area
    area_list = data.reduce([]) do |area_list, row|
      area_list << row[:rate_area]
    end.uniq
    area_list.length == 1 ? area_list[0] : nil
  end

  def silver_plans
    rate_area.nil? ? nil : plan_table.find(rate_area, state, "Silver")
  end

  def sorted_plans
    silver_plans.nil? || silver_plans.empty? ? nil : silver_plans.sort_by { |plan| plan[:rate] }
  end

  def second_lowest_silver_plan_rate
    sorted_plans.nil? ? nil : sorted_plans[1][:rate]
  end
end
